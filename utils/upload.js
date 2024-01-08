import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv'
import multer from 'multer'
dotenv.config();

const username=process.env.DB_username;
const password=process.env.DB_password;
const storage= new GridFsStorage({
    url:`mongodb://${username}:${password}@ac-twjbyaa-shard-00-00.glqvfb8.mongodb.net:27017,ac-twjbyaa-shard-00-01.glqvfb8.mongodb.net:27017,ac-twjbyaa-shard-00-02.glqvfb8.mongodb.net:27017/?ssl=true&replicaSet=atlas-4mr2bg-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options:{useNewUrlParser: true},
    file:(req,file)=>{
        const match=['image/png','image/jpg'];
        if(match.indexOf(file.memetype)===-1){
                return `${Date.now()}-blog-${file.originalname}`
        }
        return {
            bucketname:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }

})
export default multer({storage})