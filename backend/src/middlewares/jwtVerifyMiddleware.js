import jwt from "jsonwebtoken";

export function jwtVerifyMiddleware(req, resp , next) {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = req.cookies.token;
    const result = jwt.verify(token, JWT_SECRET_KEY);
    next();
    return;
  } catch (error) {
     console.log(error.message);
     return resp.status(401).send({message:"Unauthorized User",success:false}); 
  }
}
