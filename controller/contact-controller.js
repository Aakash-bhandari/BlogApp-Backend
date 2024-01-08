import Contact from "../model/Contact.js";

const UserQuerymsg=async (req,res)=>{
    try {
        const nuser= {name : req.body.name , email:req.body.email,contact:req.body.contact,message:req.body.message}
        const newquery=new Contact(nuser);
        await newquery.save();
        return res.status(200).json({msg:'Send Succesfull'})
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

export default UserQuerymsg;