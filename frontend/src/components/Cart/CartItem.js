import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getItems } from "../../state/action-creators/index";

export default function ProductItem({
  isAuthenticated,
  addItemToCart,
  removeItems,
  vendor
}) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const cart =
    JSON.parse(localStorage.getItem("cart")) === null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  const [sortItems, setsortItems] = useState([]);
  useEffect(() => {
    dispatch(getItems());
  }, []);

  useEffect(() => {
    const sort = items.items.map((item) => {
      var find = cart.find((o) => o.name === item.name);
      if (find !== undefined) {
        return {
          ...item,
          quantity: find.quantity,
        };
      } else {
        return {
          ...item,
          quantity: 0,
        };
      }
    });

    sort.sort((a, b) => (a.quantity > b.quantity ? -1 : 1));
    setsortItems(sort);
  }, [items]);

  return (
    <>
      {sortItems.map((product) => {
        return (
          <Card
            sx={{ display: "flex", paddingInline: 2, margin: 5, height: 250 }}
            key={product.ID}
          >
            <CardMedia
              component="img"
              sx={{
                width: 350,
                height: 200,
                minWidth: 350,
                borderRadius: 3,
                alignSelf: "center",
              }}
              image={`https://drive.google.com/uc?export=view&id=${product.link}`}
              alt="Live from space album cover"
            />
            <CardContent
              sx={{
                width: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingInline: 10,
              }}
            >
              <Typography
                variant="h6"
                color="text.primary"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {product.name.toUpperCase()}
              </Typography>
              <Typography variant="h6" color="text.primary" component="div">
                Rs. {product.price}
              </Typography>
            </CardContent>
            {(isAuthenticated || vendor !== null) && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  paddingInline: 2,
                }}
              >
                <TextField
                  sx={{ width: 150 }}
                  id={product.ID}
                  defaultValue={product.quantity > 0 ? product.quantity : null}
                  label="Qty"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Add to cart"
                  size="small"
                  onChange={addItemToCart}
                  InputProps={{
                    inputProps: {
                      min: 1,
                      "data-price": product.price,
                      "data-name": product.name,
                    },
                  }}
                />
                {
                  <Button
                    id={product.ID}
                    variant="contained"
                    sx={{
                      width: 150,
                      ":hover": { backgroundColor: "#7c2e41" },
                      backgroundColor: "#7c2e41",
                    }}
                    onClick={removeItems}
                  >
                    Remove
                  </Button>
                }
              </Box>
            )}
          </Card>
        );
      })}
    </>
  );
}
