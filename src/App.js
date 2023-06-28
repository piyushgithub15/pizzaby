import "./App.css";
import Items from "./components/elements/Items";
import MyNavbar from "./components/elements/MyNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./Contexts/AuthContext";
import UserContext from "./Contexts/UserContext";
import UserIdContext from "./Contexts/UserIdContext";
import { useState } from "react";
import CartItemsContext from "./Contexts/CartItemsContext";
import DeleteContext from "./Contexts/DeleteContext";

import Cart from "./components/elements/Cart";

function App() {
  const [isLogin, setIsLogin ]=useState(false);
  const [userName, setUserName]=useState("");
  const [userId,setUserId]=useState("")
  const [cartItems,setCartItems]=useState([]);
  const [isDelete,setIsDelete]=useState(false);


  
 
  return (
    <>
    <UserIdContext.Provider value= {{userId,setUserId}} >

      <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      <DeleteContext.Provider value={{isDelete,setIsDelete}}>
      <CartItemsContext.Provider value={{cartItems,setCartItems}}>
        <UserContext.Provider value={{ userName, setUserName }}>
          <BrowserRouter>
            <MyNavbar />
            <Routes>
              <Route path="/" element={<Items key="home" category="" />} />
              <Route
                path="/pizza"
                element={<Items key="pizza" category="Pizza" />}
              />
              <Route
                path="/dessert"
                element={<Items key="dessert" category="Dessert" />}
              />
              <Route
                path="/refreshments"
                element={<Items key="refreshments" category="Refreshment" />}
              />
          <Route
                path="/lunchbox"
                element ={<Cart/>}
              />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
</CartItemsContext.Provider>
</DeleteContext.Provider>
      </AuthContext.Provider>
    </UserIdContext.Provider>
    </>
  );
}

export default App;
