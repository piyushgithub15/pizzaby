import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import AuthContext from "../../Contexts/AuthContext";
import axios from "axios";
import UserIdContext from "../../Contexts/UserIdContext";
import CartItemsContext from "../../Contexts/CartItemsContext";
import DeleteContext from "../../Contexts/DeleteContext";

const Cart = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  //const [cartItems,setCartItems]=useState([]);
  const { userId, setUserId } = useContext(UserIdContext);
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const {isDelete,setIsDelete}=useContext(DeleteContext)
  
const [totalAmount,setTotalAmount]=useState(0);
  useEffect(() => {
    const getCartItems = async () => {
     
      try {
        const response = await axios.post(
          "http://localhost:8000/cart/getcart",
          {
            userId,
          },

          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Credentials": "true",
            },
            withCredentials: true,
          }
        );
       let sum=0;
        for(var i=0;i<response.data.length;i++)
        {
          console.log(response.data[i].itemPrice)
        sum+=response.data[i].itemPrice*response.data[i].quantity;

        }
        console.log(response.data);
        setCartItems(response.data);
        setTotalAmount(sum)
      } catch (error) {
        console.log(error.message);
      }
    };

    getCartItems();
  }, [isDelete]);

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


  const handlePayment =async(e)=>{
    e.preventDefault();
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  // );

  // if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  // }

  const result = await axios.post("http://localhost:8000/payment/order",{
   amount:totalAmount,
   currency:"INR",
  
    },

{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    })

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: process.env.REACT_RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
   
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("http://localhost:8000/payment/verify", data,{
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Credentials": "true",
            },
            withCredentials: true,
          })

         // alert(result.data.msg);
          if(result.data.msg==="success")
          {
            const dele=await axios.get("http://localhost:8000/cart/deletecart",{
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
              },
              withCredentials: true,
            })
            if(isDelete)
            setIsDelete(false);
            else
            setIsDelete(true);
            console.log(dele)
          }
      },
      
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }

  return (
    <div>
    <div className="h-100 mt-5 d-flex  justify-content-center">
      <div className="container row row-cols-1 row-cols-md-1 justify-content-center">
        {isLogin ? (
          cartItems.map((item) => (
            <CartItem
              key={item.itemName}
              price={item.itemPrice}
              quantity={item.quantity}
              name={item.itemName}
              id = {item.itemId}
            />
          ))
        ) : (
          <h1>PLEASE LOGIN FIRST</h1>
        )}
      </div>
     
    </div>
   {isLogin && <div className= "mb-5 justify-content-center" style={{marginTop:"20px"}}>
    <h2 style={{marginLeft:"35%"}}>TOTAL AMOUNT PAYABLE :-{totalAmount}</h2>
      <button className="btn btn-secondary" style={{marginLeft:"40%"}} onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      </div>}
      </div>
  );
};

export default Cart;
