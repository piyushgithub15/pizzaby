import React,{useContext} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import DeleteContext from "../../Contexts/DeleteContext";
import UserContext from "../../Contexts/UserContext";

const CartItem = (props) => {
  
  const { price, name, quantity,id } = props;
  const {isDelete,setIsDelete}=useContext(DeleteContext)
  

 

  const handleRemove = async()=>{
      const response = await axios.delete(`http://localhost:8000/cart/deleteItem/${id}`, {
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

  }

  const handleQuantity = async(action)=>{

    if(quantity>0)
    {
   

      const response = await axios.post("http://localhost:8000/cart/addtocart",{
      item:id,
      
      action
      },
  {
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
  }
    else if(quantity==0)
    {
      handleRemove();
    }

  }

  return (
    <>
   {quantity>0 &&  <div className="card" style={{ width: "30%", margin: "4px" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
        <p className="card-text">{quantity}</p>
        <button  className="btn btn-success" style={{margin:"8px"}} onClick={()=>handleQuantity("notadd")}>
-
        </button>
        <button  className="btn btn-success" style={{margin:"8px"}} onClick={()=>handleQuantity("add")}>
          +
        </button>
        <button  className="btn btn-danger" style={{margin:"8px"}} onClick={handleRemove}>
          Remove From Cart
        </button>
      </div>
    </div>}
    </>
  );
};

export default CartItem;
