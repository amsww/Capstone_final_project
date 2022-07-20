require('./database').connect();
const express = require('express');
const UserVer = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
require("dotenv").config();
const mongoose = require("mongoose");


const app = express();
app.use(express.json());



const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (authHeader) {
      const token = authHeader;

      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};



app.post("/login", async (req, res) => {
    try {

      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).json({
          "message":"All input is required"
        });
        return
      }

      const user = await UserVer.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        user.token = token;
  

        res.status(200).json({
          "token":user.token
        });
        return
      }

      res.status(400).json({
        "message":"Invalid Credentials"
      });
      return;
    } catch (err) {
      console.log(err);
    }
  });


  app.post("/register", async (req, res) => {
    try {

      const {email, password ,name } = req.body;
  

      if (!(email && password && name)) {
        res.status(400).json({"message":"All input is required"});
        return
      }
  

      const oldUser = await UserVer.findOne({ email });
  
      if (oldUser) {
        return res.status(409).json({"message":"User Already Exist. Please Login"});
      }
  

      encryptedPassword = await bcrypt.hash(password, 10);


      const user = await UserVer.create({
        email: email.toLowerCase(), 
        name:name,
        password: encryptedPassword,
        cart:[],
        wishlist:[]
      });
  

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
  

      res.status(200).json({
        "token":user.token
      });
      return
    } catch (err) {
      console.log(err);
    }
  });


  app.post("/home", auth ,  (req, res) => {
    res.status(200).json({"message":"Hello User"});
  });


  app.get("/login", (req, res) => {
    res.status(200).json({
      "message":"Hello Login Get"
    })
  })
  


  app.get("/user",authenticateJWT,async (req, res) => {

    const email = req.user.email;

    const user = await UserVer.findOne({ email });
    if (user) {
      res.status(200).json({
        cart:user?.cart,
        user:user?.name,
        wishlist:user.wishlist
      })
    }   else  {
      res.status(404).json({
        "error":"error"
      })
    }
  })



  app.post("/addUser",authenticateJWT,async(req,res)=> {
    const {item} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    const exist = user.cart.findIndex(prod => prod?.id == item?.id);
    if(exist !== -1){
       user.cart[exist].qty +=1
       user.save();

  } else{
        user.cart.push(item);
        user.save();
      }
    res.status(200).json({"cart":user.cart})
  })


  app.post("/removeUser",authenticateJWT,async(req,res)=> {
    const {id} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    user.cart = user.cart.filter(item => item.id !== id)
    user.save()
    res.status(200).json({"cart":user.cart})
  })

  app.post("/updQty",authenticateJWT,async(req,res)=> {
    const {id,qty} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    const index = user.cart.findIndex(prod => prod?.id == id)
    if (qty == 0){
      user.cart = user.cart.filter(item => item.id !== id)
      user.save()
    }  else { 
      user.cart[index].qty = qty;
      user.save()
    }
    
    res.status(200).json({"cart":user.cart})
  })

  app.post('/addWishlist',authenticateJWT,async(req,res)=> {
    const {item} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    const exist = user.wishlist.find(prod => prod.id === item.id);
    if(!exist){
      user.wishlist.push(item)
      user.save();
    }
    res.json({wishlist:user.wishlist})
  })


  app.post("/changePassword",async(req,res)=> {
    const {email, password,confirmpass} = req.body;
    let user = await UserVer.findOne({ email });

    if (!user) res.json({"message":"User Not Found"})
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const hashedNew = await bcrypt.hash(confirmpass, 10);
      const filter = { email };
      const doc = { $set: { password:hashedNew} };
      
      UserVer.findOneAndUpdate(filter, doc, (err, doc) => {
          if (err) console.log("Something wrong when updating data!");
      });
      
      res.status(200).json({"message":"Password Changed Successfully"})
    } else if (await bcrypt.compare(password, user.password) == false) {
        res.json({"message" : "Password is Wrong, Try again!"})
    }

  })



  app.post("/emailCh", async(req,res)=> {
    const {email} = req.body;
    let user = await UserVer.findOne({ email });

    if(user){
      res.status(200).json({"message":true})
    } else if(email =="") {
      res.status(404).json({"message":undefined})
    } else {
      res.status(403).json({"message":false})
    }
  })


  app.post("/remWishlist", authenticateJWT, async(req,res) => {
    try{
      const {id} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    user.wishlist = user?.wishlist.filter(item => item.id !== id);
    user.save()
  
  res.status(200).json({wishlist:user.wishlist})
    } catch(error){
      console.log(error)
    }
  })


  app.post("/wishCart", authenticateJWT,async(req,res) => {
   try {
    const {item} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    const exist = user.cart.findIndex(prod => prod.id == item.id);
    if (exist == -1) {
      user.cart.push(item);
      user.save()
    }   
    res.send({
      cart:user.cart
    })
   } catch(error){
     console.log(error)
   }
  })

  app.post("/wishlist",authenticateJWT, async(req,res)=> {
    const {id} = req.body;
    const email = req.user.email;
    let user = await UserVer.findOne({ email });
    const exist = user.wishlist.find(item => item.id === id)
    if (exist) {
      res.send({
        message:true
      })
    }  else {
      res.send({
        message:false
      })
    }
  })



  app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });



  module.exports = app;


    //   const newWish = user?.wishlist.filter(item => item.id !== id);

  //   const filter = { email };
  //   const doc = { $set: { wishlist:newWish} };

  //   await UserVer.findOneAndUpdate(filter, doc, (err, doc) => {
  //     if (err) console.log("Something wrong when updating data!");
  // });