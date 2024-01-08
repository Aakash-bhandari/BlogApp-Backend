import express from 'express';
import SignupUser, { Login_through_Google } from '../controller/user_controller.js';
import {Loginuser,logoutUser} from '../controller/user_controller.js';
import {UploadImage ,getImage} from '../controller/image_controller.js';
import upload from '../utils/upload.js'
import { createPost,getAllPosts,getpost,updatepost,deletePost,getmyposts } from '../controller/post_controller.js';
import { newComment ,getComments,deleteComment} from '../controller/comment-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import UserQuerymsg  from '../controller/contact-controller.js';


const Router=express.Router();
Router.post('/signup',SignupUser);
Router.post('/login',Loginuser);
Router.post('/google_auth',Login_through_Google);
Router.post('/file/upload',upload.single('file'),UploadImage);
Router.get('/file/:filename',getImage);
Router.post('/create',authenticateToken,createPost);
Router.get('/posts',authenticateToken,getAllPosts);
Router.get('/post/:id',authenticateToken,getpost);
Router.post('/myposts',authenticateToken,getmyposts);
Router.put('/update/:id',authenticateToken,updatepost);
Router.delete('/delete/:id', authenticateToken, deletePost);
Router.post('/comment/new',authenticateToken,newComment);
Router.get('/comments/:id',authenticateToken,getComments);
Router.delete('/comment/delete/:id', authenticateToken, deleteComment);
Router.post('/logout', logoutUser);
Router.post('/contact',UserQuerymsg);

export default Router;
