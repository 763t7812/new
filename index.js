const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: '*'
  }));

  const mongoose = require("mongoose");
const Users = require('./Users');
const uri = "mongodb+srv://ziadmo1425:EjDUoq4WodZ43k4U@cluster0.toeymcd.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

  
const port = process.env.PORT || 5001

// const pool  = mysql.createPool({
   
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'omegle',
//     port:"8889"
// })

// configs
app.use(express.json());



// routes
app.get('/api/getids',(req,res)=>{

    Users.find({status:"1"}).then((response)=>{
      res.send({status:200,data:response})
    }).catch((err)=>{
      console.log(err);
    })

    // let sql = 'SELECT uid FROM `users` WHERE `status`=1'
    // pool.getConnection((err,connection)=>{
    //     if(err) return res.send({status:500,data:[]})
    //     connection.query(sql,(err,rows)=>{
    //       if(err) return res.send({status:500,data:[]}) 
    //       return  res.send({status:200,data:rows}) 
    //     })
    // })
})

app.get('/api/join/:id',(req,res)=>{
    let id = req.params.id


    const user = new Users({
      uid:id,
      status:"0"
    })


    user.save().then((response)=>{
      if(data){
        res.send({status:200,data:response}) 
      }
    }).catch((err)=>{
      console.log(err);
    })
    // let sql = 'INSERT INTO `users`(`uid`) VALUES (?)'

    // pool.query(sql,[id],(err,data)=>{
    //   if(err){
    //     console.log(err);
    //     res.send(err)
    //   }

    



     

    // })
    // pool.getConnection((err,connection)=>{
    //     if(err) return res.send({status:500,data:[]})
    //     connection.query(sql,[id],(err,rows)=>{
    //       if(err) return res.send({status:500,data:[]}) 
    //       return  res.send({status:200,data:rows}) 
    //     })
    // })
    
})

app.get('/api/leave/:id',(req,res)=>{
    let id = req.params.id
    res.send({status:200,data:id}) 
    let sql = 'DELETE FROM `users` WHERE `uid` = ?'
    // pool.getConnection((err,connection)=>{
    //     if(err) return res.send({status:500,data:[]})
    //     connection.query(sql,[id],(err,rows)=>{
    //       if(err) return res.send({status:500,data:[]}) 
    //       return  res.send({status:200,data:rows}) 
    //     })
    // })
    
})

app.get('/api/call/:id',(req,res)=>{
    let id = req.params.id


    Users.updateOne({ uid: id }, {
      status: '1'
    }).then((response)=>{
      res.send({status:200,data:response}) 

      res.end()
    }).catch((err)=>{
      console.log(err);
    })

    // let sql = 'UPDATE `users` SET `status`=1 WHERE `uid` =?'

    // console.log("call",id);

    // pool.query(sql,[id],(err,data)=>{
    //   if(err){
    //     console.log(err);
    //     res.send(err)
    //   }


   
       
      

    // })
    // pool.getConnection((err,connection)=>{
    //     if(err) return res.send({status:500,data:[]})
    //     connection.query(sql,[id],(err,rows)=>{
    //       if(err) return res.send({status:500,data:[]}) 
    //       return  res.send({status:200,data:rows}) 
    //     })
    // })
    
})



mongoose.connect(uri).then((res)=> {
  console.log("Connected to DB");
  app.listen(port,()=>console.log('listening on port '+port))
})
.catch((err)=>{console.log(err)})
