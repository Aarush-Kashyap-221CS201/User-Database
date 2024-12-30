const userController=require('../controllers/userController');

const { Router }=require('express');
const userRouter=Router();
  
userRouter.get("/create",(req,res)=>res.render('create',{errors:[]}));
userRouter.post("/create",userController.createUser);

userRouter.get("/update/:id",(req,res)=>res.render('update',{id:req.params.id,errors:[]}));
userRouter.post("/update/:id",userController.updateUser);

userRouter.get("/delete/:id",userController.deleteUser);

userRouter.get("/", userController.getUsers);

module.exports=userRouter;