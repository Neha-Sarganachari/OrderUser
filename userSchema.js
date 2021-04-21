var mongoose=require('mongoose');

var Schema=mongoose.Schema;

const userSchema = new Schema({

    userId: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    noOfOrders: {
        type: Number,
        default: 0
    },
    averageBillvalue:{
        type: Number,
        default:0
    }

});

const userDetails=mongoose.model("userDetails", userSchema);

module.exports=userDetails;