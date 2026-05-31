import multer from "multer";
import path from "path";
const filePath = path.resolve("src","uploads");
const storage = multer.diskStorage({
   destination:function(req,file,cb){
      cb(null,filePath+"/"+file.fieldname);
   },
    filename:function(req,file,cb){
      cb(null,file.originalname);
   } 
});
const upload = multer({storage});

export default upload;