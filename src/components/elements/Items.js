import React, { useEffect, useState, useContext } from "react";
import Itemcard from "./Itemcard";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";
import AuthContext from "../../Contexts/AuthContext";
import UserIdContext from "../../Contexts/UserIdContext";
import CartItemsContext from "../../Contexts/CartItemsContext";

const Items = (props) => {
  const { userName, setUserName } = useContext(UserContext);
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const { userId, setUserId } = useContext(UserIdContext);
  const { category } = props;
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const autoLogin = async () => {
      console.log("AUTO LOGIN CALLED");
      try {
        const response = await axios.get(
          "http://localhost:8000/users/auto",

          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Credentials": "true",
            },
            withCredentials: true,
          }
        );
        console.log(response.data.success);
        if (response.data.success) {
          console.log(response.data.name);
          setIsLogin(true);
          setUserName(response.data.name);
          setUserId(response.data.id);

          // history('/');
        } else {
          alert("WRONG PASSWORD");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // const getCartItems =async() => {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8000/cart/getcart",{
    //         userId
    //       },

    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Origin": "http://localhost:3000",
    //           "Access-Control-Allow-Credentials": "true",
    //         },
    //         withCredentials: true,
    //       }
    //     );
    //         console.log(response.data)
    //    setCartItems(response.data)

    //   } catch (error) {
    //     console.log(error.message)

    //   }
    // }

    const fetchData = async () => {
      try {
        let url = "http://localhost:8000/items/all";
        if (category.length > 0) {
          url = `http://localhost:8000/items?category=${category}`;
        }

        const response = await axios.get(url, {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        });
        console.log(response);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("USE EFFECT IS TRIGGERED");
    autoLogin();
    fetchData();
    // getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="h-100 mt-5 d-flex align-items-center justify-content-center">
        <div className="container row row-cols-1 row-cols-md-3">
          {items.map((item) => (
            <Itemcard
              key={item.name}
              name={item.name}
              description={item.description}
              price={item.price}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Items;
