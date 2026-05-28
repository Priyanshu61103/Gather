import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
   publicKey : process.env.PUBLIC_KEY,
   privateKey: process.env.PRIVATE_KEY,
   urlEndPoint: process.env.URL_ENDPOINT
});

export default imageKit;