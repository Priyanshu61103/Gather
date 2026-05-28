import bcrypt from "bcrypt";

export async function passwordHashingMiddleware(req,resp,next) {
  try {
    const data = req.body;
    // bcrypt.genSalt(n) will generate a random number (salt) and adds a header to salt that hash password 2 to power n times when used for hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;
    req.userDetails = data;
    next();
    return;
  } catch (error) {
    console.log(error.message);
    resp.status(500).send({message:error.message,success:false});
    return;
  }
}
