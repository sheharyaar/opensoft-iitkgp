import ResponsiveAppBar from "../Extras/Header/navBar";
import CartGrid from "./CartGrid";
import OrderSummary from "./OrderSummary";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export default function Menu() {
  const user = useSelector((state) => state.Login.items);
  const vendor = localStorage.getItem("vendor");
  const [isAuthenticated, setisAuthenticated] = useState(true);
  useEffect(() => {
    if (user.length === 0 && !localStorage.getItem("user")) {
      setisAuthenticated(false);
    }
  }, [user]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) === null
      ? []
      : JSON.parse(localStorage.getItem("cart"))
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (e) => {
    if (cartItems.filter((item) => item.id === e.target.id).length > 0) {
      return setCartItems(
        cartItems.map((item) =>
          item.id === e.target.id
            ? {
                id: e.target.id,
                name: e.target.getAttribute("data-name"),
                price: e.target.getAttribute("data-price"),
                quantity: e.target.value,
              }
            : item
        )
      );
    } else {
      return setCartItems([
        ...cartItems,
        {
          id: e.target.id,
          name: e.target.getAttribute("data-name"),
          price: e.target.getAttribute("data-price"),
          quantity: e.target.value,
        },
      ]);
    }
  };

  const removeItems = (e) => {
    e.target.parentNode.firstChild.lastChild.firstChild.value = null;
    setCartItems(cartItems.filter((item) => item.id !== e.target.id));
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((item) => item.id !== e.target.id))
    );
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CartGrid
            isAuthenticated={isAuthenticated}
            vendor={vendor}
            addItemToCart={addItemToCart}
            removeItems={removeItems}
          />
        </Grid>
        <Grid item xs={4}>
          <OrderSummary
            isAuthenticated={isAuthenticated}
            cartItems={cartItems}
            vendor={vendor}
          />
        </Grid>
      </Grid>
    </div>
  );
}
