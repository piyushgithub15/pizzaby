const Razorpay = require('razorpay')
const crypto =require('crypto')


const createOrder= async(req,res)=>{
    const {amount,currency}=req.body

    try {
        console.log(amount)
        const instance = new Razorpay({
            key_id: process.env.REACT_RAZORPAY_KEYID,
            key_secret: process.env.REACT_RAZORPAY_SECRET,
        });
const receipt =Math.random().toString().slice(2,11);
        const options = {
            amount: parseInt(amount)*100,
            currency,
            receipt,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }


}
const verify= async(req,res)=>{

    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
            console.log(orderCreationId)
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.REACT_RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
        console.log(digest)
        console.log(razorpaySignature)

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

    
}
module.exports={
    createOrder,
    verify
}