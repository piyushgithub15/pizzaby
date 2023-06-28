const Cart = require("../../Models/Cart");
const User = require("../../Models/User");
const Item = require("../../Models/Fooditem");
const jwtt = require('jsonwebtoken')

const addtoCart = async (req, res) => {
  const { item,action } = req.body;
  try {
    console.log(item)
    const token = req.cookies;
        console.log(token.jwt);
        if (!token) return res.status(401).json({ success: false });
      
          const decoded = jwtt.verify(
            token.jwt,
            process.env.REACT_APP_JWT_SECRET_KEY
          ).payload;
      
        
          const userId = decoded.id;
    console.log(userId)
    if (!item)
      return res.status(401).json({ message: "Item Not Found" });

    const cartItem = await Cart.findOne({ item, userId });

    if (cartItem) {
        let updatedCart;
        if(action==="add")
       updatedCart = await Cart.findOneAndUpdate(
        { item, userId },
        { quantity: cartItem.quantity + 1 },
        { new: true }
      );
      else
       updatedCart = await Cart.findOneAndUpdate(
        { item, userId },
        { quantity: cartItem.quantity - 1 },
        { new: true }
      );
      res.status(201).send(updatedCart);
    } else {
      console.log({ user: userId, itemId: item });
      const cart = await Cart.create({ item, userId, quantity: 1 });

      res.status(201).send(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) return res.status(400).send("NOT A USER");

    const data = await Cart.find({ userId });

    if (!data) return res.send(201).send("PLEASE ADD SOMETHING");

    let cartData = [];
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const fooditem = await Item.findById(data[i].item);
      const name = fooditem.name;
      const price = fooditem.price;
      const quantity = data[i].quantity;
      cartData.push({
        itemName: name,
        itemPrice: price,
        quantity,
        itemId:fooditem.id
      });
    }

    res.status(201).send(cartData);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const deleteItem = async(req,res)=>{
    try {
        const item = req.params.id
        const token = req.cookies;
        console.log(token.jwt);
        if (!token) return res.status(401).json({ success: false });
      
          const decoded = jwtt.verify(
            token.jwt,
            process.env.REACT_APP_JWT_SECRET_KEY
          ).payload;
      
          console.log(decoded);
          const userId = decoded.id;

          const deletedEntry = await Cart.findOneAndDelete({userId,item})
          console.log(deletedEntry)
          res.send(deletedEntry)
        
    } catch (error) {
            res.send(error.message)
    }

}
const deleteCart =async(req,res)=>{
  try {
   console.log("DELETING CART")
    const token = req.cookies;
    console.log(token.jwt);
    if (!token) return res.status(401).json({ success: false });
  
      const decoded = jwtt.verify(
        token.jwt,
        process.env.REACT_APP_JWT_SECRET_KEY
      ).payload;
  
      console.log(decoded);
      const userId = decoded.id;

      const deletedCart= await Cart.deleteMany({userId})

      res.status(200).json(deletedCart)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}


module.exports = {
  addtoCart,
  getCart,
  deleteItem,
  deleteCart
};
