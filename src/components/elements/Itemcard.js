import React,{useContext} from "react";
import "../styles/itemcard.css";
import axios from "axios";
import UserIdContext from "../../Contexts/UserIdContext";
import AuthContext from "../../Contexts/AuthContext";
const Itemcard = (props) => {
  const {userId,setUserId}= useContext(UserIdContext)
  const {isLogin,setIsLogin}=useContext(AuthContext)
  const { name, description, price,id } = props;
  const handleAddToCart = async(e)=>{
    e.preventDefault()

   if(isLogin) 
   {
     console.log({user:userId,item:id})

    const response = await axios.post("http://localhost:8000/cart/addtocart",{
    item:id,
    
    action:"add"
    },
{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    })

    console.log(response)
}
else
{
  alert("LOGIN FIRST")
}

  }

  return (
    <>
      <div>
        <div className="card my-3 ">
          <img
            className="card-img-top "
            src="https://picsum.photos/100/50"
            alt="Card cap"
          />
          <div className="card-body align-items-center">
            <h5 className="card-title">{name}</h5>
            <p>${price}</p>
            <p className="card-text">{description}</p>
            <div className="button">
              <button className="btn btn-primary" onClick={handleAddToCart}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Itemcard;
