import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./BestSeller.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBestSeller } from "../../../../state/action-creators/index";

export default function BestSeller() {
  const dispatch = useDispatch();
  const bestSeller = useSelector((state) => state.bestSeller);
  useEffect(() => {
    dispatch(getBestSeller());
  }, []);

  return (
    <div className="content">
      {bestSeller.items.map((el) => {
        return (
          <Card className="BestSeller__card" key={el.ID}>
            <CardMedia
              component="img"
              alt="Food"
              height="140"
              image={`https://drive.google.com/uc?export=view&id=${el.link}`}
            />
            <CardContent sx={{ height: 100 }}>
              <Typography gutterBottom variant="h6" component="div">
                {el.name.toUpperCase()}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button sx={{ color: "#7c2e41" }}>Rs. {el.price}</Button>
              <Button
                variant="contained"
                sx={{
                  ":hover": { backgroundColor: "#7c2e41" },
                  backgroundColor: "#7c2e41",
                }}
                href="/Menu"
              >
                Buy Now
              </Button>
            </CardActions>
          </Card>
        );
      })}
      {bestSeller.error !== null && bestSeller.items.length === 0 && (
        <Typography
          sx={{ color: "red", m: 5, fontSize: "24px", width: "100%" }}
          align="center"
        >
          Non-Essential Services are down. Sorry for inconvinience.
        </Typography>
      )}
    </div>
  );
}
