var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');
const JWT_KEY="secret";


const SignUpFunction= (req, res, next)=>  {
    // كدا  هو جابلي الايميلات كلها بقت معايا
    userModel.find({ email: req.body.email }).then(
        (result) => {
            if (result.length < 1) {
                bcrypt.hash(req.body.password, 10, (err, hashMessage) => {
                    if (err) {
                        res.status(404).json({
                            massage: "404 Not Found"
                        }
                        )
                    } else {
                        const newUser = new userModel({
                            _id:new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hashMessage,
                            phone: req.body.phone
                        })
                        newUser.save().
                            then(data => {
                                console.log(newUser)
                                res.status(200).json({
                                    massage: 'Data is Saved'
                                })
                            }).
                            catch(err => {
                                res.status(404).json({
                                    massage: 'Data Cant save !!',
                                })
                            }
                            )

                    }
                })
            } else {

                res.status(409).json({
                    massage: "Sorry, this user Is Existed in DataBase.!"
                })

            }
        }
    ).catch(
        err => {
            res.status(404).json({
                massage: err,
            })
        }
    )

    //hash Password

}

const SigninFunction= (req, res, next) => {
    userModel.find({ email: req.body.email }).
        then((emailOfUser) => {
         
            if (emailOfUser.length < 1) {
             
                 return res.status(404).json({
                            massage:"Auth failed"
                        });
                    }      
                bcrypt.compare(req.body.password, emailOfUser[0].password,(err,result)=>{
                    if(err){
                        return res.status(404).json({
                            massage:"Auth failed"
                        });
                    }if(result){
                       const token= jwt.sign({
                            email:emailOfUser[0].email,
                            id:emailOfUser[0]._id
                         },
                         JWT_KEY,
                         {
                             expiresIn :"1h"
                         }
                         );
                       
                        return res.status(200).json({
                           massage: 'Signin done..',
                            token:token
                         }); }
                         else{
                            return res.status(404).json({
                                massage:"Auth failed"
                            });

                         }
                   })
          }
           

        ).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}

const UpdateUser=(req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        hash => {
            const newUser = {
                newname: req.body.username,
                email: req.body.email,
                password: hash,
                phone: req.body.phone
            }
            userModel.findOneAndUpdate({ _id: req.params.id }, { $set: newUser }).then(
                theNewUser => {
                 
                   if(theNewUser){
                       console.log(theNewUser)
                    res.status(202).json({
                        massage: "User Updated."
                    })
                   }else{
                       res.status(404).json({
                           massage:"User Not Found"
                       })
                   }
                }
            ).catch(
                err => {
                    res.status(404).json({
                        massage: err
                    })
                }
            )
        }

    ).catch(
        err => {
            res.status(404).json({
                massage: err
            })
        }
    )

}

const DeleteUser=(req,res,next)=>{
userModel.findOneAndDelete({_id:req.params.id}).
then(deletedUSer=>{
    if(deletedUSer){
         res.status(200).json({
        massage:"User Deleted."
    })
} else{
    res.status(404).json({
        massage:"User Already Deleted"
    })
}
    }
   
  
).
catch(err => {
    res.status(404).json({
        massage: err
    })
})
}

module.exports={
    SignUpFunction:SignUpFunction,
    SigninFunction:SigninFunction,
    UpdateUser:UpdateUser,
    DeleteUser:DeleteUser
}