var express=require('express');
var router=express.Router();

const userDetails=require('../model/userSchema');
const orderDetails=require('../model/orderSchema');
//write get and put

//get data for user collection only userid and name
router.get('/userDetails', (req, res)=>{
    userDetails.find({},{__v:0,_id:0}, (err, result)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.send(result);
        }
        });

});

//get orderDetails for each user based on ID 
router.get('/userDetails/:id',(req, res)=>{
userDetails.find({_id: req.params.id},(err, result)=>{
    if(err)
    {
        res.json(err);
    }
    else{
        res.json(result);
    }
});
});


//get data for orderDetails
router.get('/orderDetails', (req, res)=>{
    orderDetails.find({},{__v:0}, (err, result)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.send(result);
        }
        });

});


//get order details based on user id
router.get('/orderDetails/:userId', (req, res)=>{
    orderDetails.find({userId: req.params.userId},{__v:0}, (err, result)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.send(result);
        }
        });

});



//get count of orders for each userId
router.get('/count/:userId',(req,res)=>
{
orderDetails.find({}).countDocuments({'userId': req.params.userId}).exec((err,count)=>{
    if(err)
    {
        res.send(err);
    }
    res.json({noOfOrders: count});

});
});


const _ =require('underscore-node');



//get sum of subtotals for each user
router.get('/sum/:userId',(req,res)=>
{

orderDetails.find({userId: req.params.userId}, function(err, result) {
    let sum = _.reduce(result, function(memo, reading){ return memo + reading.subtotal; }, 0);
    res.json({sum: sum})
});


});


//insert data for user collection
router.post('/userDetails', (req, res) =>{
    let newUserDetails = new userDetails({
        userId: req.body.userId,
        name: req.body.name
    });

    newUserDetails.save((err, newUser)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.json({msg: 'successfully added new user'});
        }
    });
});


//insert data into order collection for each user I
router.post('/userDetails/:id', (req, res) =>{
    let newOrderDetails = new orderDetails({
        orderId: req.body.orderId,
        // temp:req.params.id,
        userId: req.params.id,

        subtotal: req.body.subtotal,
        date:req.body.date
    });

    newOrderDetails.save((err, neworder)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.json({msg: 'successfully added new order'});
        }
    });
});


//add noOfOrders to UserTable
router.put('/newUserDetails/:id', (req, res, next)=>{ 
    userDetails.findOneAndUpdate(
        {_id: req.params.id},

        {
         $set : {
                    userId:req.body.userId,
                    name: req.body.name,
                    noOfOrders: req.body.noOfOrders
                }
        },

        function(err, result){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(result);
            }
        });
});

//getting individual users with updated table
router.get('/newUserDetails/:id', (req, res) =>{
    orderDetails.find({_id:req.params.id}).countDocuments({'userId': req.params.userId}).exec((err,count)=>{
        if(err)
        {
            res.send(err);
        }
        res.json({noOfOrders: count},{userId:req.body.userId});
    
    });;
});


//delete all data from order collection
router.delete('/orderDetails',(req, res)=>{
    orderDetails.remove({}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json({msg: 'All data deleted from Order collection'});
        }
    });
});

//delete data from order collection based on orderId
router.delete('/orderDetails/:orderId', (req, res, next)=>{
    orderDetails.remove({orderId: req.params.orderId}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports=router;