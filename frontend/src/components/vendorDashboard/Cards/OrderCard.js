import * as React from "react";
import CardActions from "@mui/material/CardActions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./OrderCard.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  CardHeader,
} from "@mui/material";
import baseUrl from "../../../state/urls";

export default function OrderCard({ orders }) {
  function getDate(orderDate) {
    const date = new Date(orderDate);
    return date.toLocaleString();
  }

  return (
    <div className="content" sx={{ display: "flex", flexWrap: "wrap" }}>
      {orders.map((el) => {
        return (
          <>
            {el.orders.map((item) => {
              return (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      margin: 5,
                      width: 350,
                      padding: 3,
                    }}
                  >
                    <CardHeader
                      title={"Order Summary"}
                      subheader={getDate(item.items[0].CreatedAt)}
                      sx={{ color: "#7c2e41", textAlign: "center" }}
                    />
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Rs.</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.items.map((e) => {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              key={e.ID}
                            >
                              <TableCell component="th" scope="row">
                                {e.item_name.toUpperCase()}
                              </TableCell>
                              <TableCell align="right">{e.quantity}</TableCell>
                              <TableCell align="right">
                                {parseFloat(e.quantity * e.price).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color="success"
                              defaultChecked={
                                item.items[0].status === "accepted"
                                  ? true
                                  : false
                              }
                              onChange={(event) => {
                                const check = event.target.checked
                                  ? "accepted"
                                  : "placed";
                                fetch(`${baseUrl}/vendors/OrderStatusTweak`, {
                                  method: "POST",
                                  body: JSON.stringify({
                                    order_id: parseInt(item.order_id),
                                    status: check,
                                  }),
                                  headers: {
                                    "Content-type": "application/json",
                                  },
                                });
                              }}
                            />
                          }
                          label="Success"
                        />
                      </FormGroup>
                    </CardActions>
                  </TableContainer>
                </>
              );
            })}
          </>
        );
      })}
    </div>
  );
}
