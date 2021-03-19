const express = require("express");
const bcrypt=require('bcrypt')
const app = express();
const users = [{}];
app.use(express.json());
app.get("/users", (req, res) => {
     res.send(users)
});
app.post('/users',async (req,res)=>{

    try{

        
        const hashedPassword= await bcrypt.hash(req.body.password,10)
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();

    }
    catch(err){
        
        res.status(500).send(err)
    }
    
})
app.post('/users/login', async (req,res)=>{

    const user=users.find(user=>user.name===req.body.name)
    if(user==null)
    {
        res.status(400).send('user not found')
    }
    try{
       if(await bcrypt.compare(req.body.password,user.password))
       res.status(201).send('Succesfully logged in')    
       else
       res.status(201).send('Password did not match') 
    }
    catch(err){
            res.status(500).send()
    }
})
app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
