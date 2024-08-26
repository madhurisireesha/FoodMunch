import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app=express()
app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'system',
    port:'3306',
    database:'foodmunch'
})
app.listen(3000,()=>{console.log("Server is Listening")})
/*admin login*/
app.post('/alogin/ahomepage',(req,res)=>{
    // const sql="select * from admini where name=? and password=?"
    // const values=[req.body.name,req.body.pass]
    db.query("select * from admini where name=? and password=?",[req.body.name,req.body.pass],(err,data)=>{
        if(err) return res.json(err)
            if(data.length>0){
                return res.json(data)
            }
            else{
                return res.json({mag:"Invalid Credentia;s"})
            }     
    })

})
/*admin adding items*/
app.post('/alogin/adiminwelcome/additem',(req,res)=>{
    const sql="Insert into items(image,name,price,description) values(?)";
    const values=[
        req.body.image,
        req.body.name,
        req.body.price,
        req.body.description
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err)
            return res.json(result)
    })
})
/*user registration*/
app.post('/register',(req,res)=>{
    const sql="Insert into users(name,mail,password) values(?)";
    const values=[
        req.body.uname,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err)
            return res.json(result)
    })
})
/*user login*/
app.post('/ulogin',(req,res)=>{
    // const sql="select * from users where name=? and password=?"
    // const values=[req.body.uname,req.body.pass]
    db.query("select * from users where name=? and password=?",[req.body.uname,req.body.pass],(err,data)=>{
        if(err) return res.json("Login Failed:Invalid Credentials")
            return res.json(data)
    })
})
/* displaying items */
app.get('/welcome',(req,res)=>{
    const sql='select * from items';
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
            return res.json(result)
    })
})
/*Delete Item*/

app.get('/alogin/adiminwelcome/deleteitem',(req,res)=>{
    const sql='select * from items';
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
            return res.json(result)
    })
})
app.delete('/alogin/adiminwelcome/deleteitem/:id',(req,res)=>{
    const sql='delete from items where name=?'
    const id=req.params.id
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
/*adding data to orders*/
app.post('/welcome/:id',(req,res)=>{
    const sql='insert into orders(name) values(?)'
   const values=[
        req.params.id
   ]
    db.query(sql,[values],(err,data)=>{
        if(err) res.json(err)
            return res.json(data)
    })
})
/* Getting orders list*/
app.get('/orderlist',(req,res)=>{
    const sql='select * from items where name=(select name from orders)'
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
/*Adding data into cart*/
app.post('/welcome/cs/:id',(req,res)=>{
    const sql='insert into cart(name) values(?)'
   const values=[
        req.params.id
   ]
    db.query(sql,[values],(err,data)=>{
        if(err) res.json(err)
            return res.json(data)
    })
})
/*Getting cart list*/

app.get('/cart',(req,res)=>{
    const sql='select * from items where name=(select name from cart)'
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})