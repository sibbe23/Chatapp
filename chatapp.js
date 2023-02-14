const express = require('express')

const bodyParser = require('body-parser')
const fs = require('fs');
const app = express();



app.use(bodyParser.urlencoded())


app.get('/',(req,res,next)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err)
            data = 'no chat exists'
        }
        
        res.send(
            ` ${data}
            <form onsubmit=" document.getElementById('username').value = localStorage.getItem('username')" action="/" method="POST"> 
            <input id="message" type="text" name="message"> 
            <input type="hidden" name="username"id="username">
                    <button type="submit">Send</button>
                     </form>`
        )
    })
    

})



app.post('/',(req,res)=>{
console.log(req.body.username)
console.log(req.body.message)
fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>
err ?  console.log(err) : res.redirect('/')) 
})

app.use('/login',(req,res)=>{
    res.setHeader("Content-Type", "text/html");
    res.send(
        `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">  
              <input type="text" name="username" id="username"> 
               <button type="submit">Login</button>
                </form>`
    )
})

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(4000)