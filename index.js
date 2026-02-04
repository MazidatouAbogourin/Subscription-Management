const express= require('express');
const cors = require('cors');
const checkRole = require('./Middlewares/checkRole');
const app = express();
app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'Alice', role: 'ADMIN' },
    { id: 2, name: 'Bob', role: 'USER' },
    { id: 3, name: 'Charlie', role: 'USER' }
]
const subscriptions=[
    { id: 1, userId: 1, plan: 'PREMIUM', status: 'ACTIVE' },
    { id: 2, userId: 2, plan: 'BASIC', status: 'ACTIVE' },
    { id: 3, userId: 3, plan: 'PREMIUM', status: 'SUSPENDED' }
];
app.get ('/users', (req, res)=>{
    res.status(200).send(users);

});
app.get('/users/:id/subcription', (req, res)=>{
    const id = req.params.id;
    const findSub = subscriptions.find(sub=> sub.userId ==id);
    if(findSub){
        res.status(202).send(findSub);
        return;
    }
    res.status(404).send([])
})

app.patch('/users/:id', checkRole('ADMIN'),(req,res)=>{
    const subId = Number(req.params.id);
    const {status}=req.body;
    const subscription =subscriptions.find (s=> s.id ==subId);
    if(!subscription){
        return res.status(404).json({
            message: "subscription not found",
            code: 404
        });

    }
    if(subscription.status==status){
        return res.json(subscription)
    }
    subscription.status=status;
    res.json(subscription);
} )
app.listen(3000, ()=>{
    console.log('we are listening to port 3000...');
})