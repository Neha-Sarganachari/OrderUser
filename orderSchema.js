var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const orderSchema=new Schema({
    orderId:{
        type: Number,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "userDetails"
    },
    subtotal:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    }

});

const orderDetails=mongoose.model("orderDetails", orderSchema);
module.exports=orderDetails;