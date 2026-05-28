/*
Suppose i ordered a pizza , if i keep asking pizza shop owner every 5 mins is my pizza ready that would be polling 
(sending requests constantly asking about response) that would be a lot of time waste , instead we can doone thing 
that pizza owner will tell us when the pizza will be ready , this is webhook ( server send the resp when it is ready no
need to send request again and again).

We use it as when anybody sign up clerk ( third-party authentication application ) , it will tell us that someone signed up and here
is their data , store in database .It will Tell us only through webhook. If we do not use webhook we have to sent request
after every few minutes forasking that someone signed up , by using webhook , clerk will automatically tell us when someone 
signed up saving lot of time.

Now,we don't have any public URL yet so , how will clerk tell us that someone signed up , to handle this we will use 
Ngrok ,which will provide us temporary public URL through which Clerk can send us data.

Also, there can be lot of hackers , who can use our data, to safeguard from this , we will use svix and cryptography 
 */

import { Webhook } from "svix";
import userModel from "../models/userSchema.js";

export async function webHookController(req, resp) {
  console.log("WEBHOOK WORKING....");
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    console.log("No WebHook Secret Key");
    return resp.status(500).send({ success: false });
  }

  /* Three things are hidden in request
       # svix-id => unique tracking number
       # svix-timestamp => timestamp when clerk sent the request so if hacker tries to send request again after copying it after 5
       minutes to duplicate account ,timestamp would be old ( 5 minutes ago one) so ,it will be rejected by svix.
       # svix-signature => string which is mix of json data and clerk_webhook_secret_key which is made using a
       mathematical algorithm of clerk.
    */
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  let event;
  try {
    event = wh.verify(req.body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.log("Error Verifying Request");
    /* clerk => authentication server
       this one is normal server
       clerk sending us data so we also have to give response to it , if we will not give response it will send data again
       and again.*/
    return resp.status(500).send({ success: false });
  }

  const eventType = event.type;

  /* event type tells what actually happened
    # "user.created": Someone just signed up for the first time.
    # "user.updated": An existing user just changed their profile picture, updated their first name, or added a new email address to their account.
    # "user.deleted": A user permanently deleted their Gather account.
    # "session.created": A user who already exists just logged in.
  */

  if (eventType == "user.created") {
    try {
      const userData = {
        _id: event.data.id,
        email: event.data.email_addresses[0].email_address,
        full_name:
          `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim(),
        username:
          event.data.username ||
          event.data.email_addresses[0].email_address.split("@")[0],
      };

      const result = await userModel.create(userData);
      if (result) {
        console.log("Data Saved in MongoDB");
        return resp.status(200).send({ success: true });
      } else {
        console.log("Data Not saved in MongoDB");
        return resp.status(500).send({ success: false });
      }
    } catch (error) {
      console.log("Data Not saved in MongoDB", error.message);
      return resp.status(500).send({ success: false });
    }
  }

  else if (event.type == "session.created") {
    try {
      const result = await userModel.find({_id:event.data.id});
      if (result) {
        console.log("Successfully LoggedIn");
        return resp.status(200).send({ success: true });
      } else return resp.status(404).send({ success: false });
    } catch (error) {
      console.log(error.message);
      return resp.status(500).send({ success: false });
    }
  }

  else if(event.type == "user.updated"){
     try{
      const userData = {
        _id: event.data.id,
        email: event.data.email_addresses[0].email_address,
        full_name:
          `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim(),
        username:
          event.data.username ||
          event.data.email_addresses[0].email_address.split("@")[0],
      };
      const result = await userModel.updateMany({_id:event.data.id},{$set:userData});
      if(result){
         console.log("Successfully Updated");
         return resp.status(200).send({success:true});
      }else{
          return resp.status(500).send({success:false});
      }
     }catch(error){
        console.log(error.message);
        return resp.status(500).send({success:false});
     }
  }

  console.log("Done");
  return resp.status(200).send({ success: true });
}
