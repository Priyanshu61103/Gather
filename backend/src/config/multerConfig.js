import multer from "multer";
import path from "path";
const fileName = path.resolve("src","uploads");
const storage = multer.diskStorage({
   destination: (req,file,cb)=>{
      cb(null, path.resolve(fileName,file.fieldname));
   },
   filename: (req,file,cb)=>{
     cb(null,file.originalname);
   }    
});

const upload = multer({storage});

export default upload;