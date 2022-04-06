import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  CardHeader,
  Button,
} from "@mui/material";

import {useEffect} from 'react'

export default function OrderSummary({ isAuthenticated, cartItems, vendor }) {
  const TotalCost = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const TotalQty = cartItems.reduce((a, b) => a + parseInt(b.quantity), 0);
  const Discount = TotalCost * 0.2;
  const GrandTotal =
    TotalCost > 0 ? parseFloat(TotalCost - Discount + 50).toFixed(2) : 0;

  return (
    <TableContainer
      component={Paper}
      sx={{ margin: 5, width: 350, padding: 3 }}
    >
      <CardHeader
        title={"Order Summary"}
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
          {cartItems.map((item) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={item.name}
            >
              <TableCell component="th" scope="row">
                {item.name.toUpperCase()}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">
                {parseFloat(item.quantity * item.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Total Cost
            </TableCell>
            <TableCell align="right">{TotalCost ? TotalQty : 0}</TableCell>
            <TableCell align="right">{TotalCost.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Discount (20%)
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              - {parseFloat(Discount).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Shipping Cost
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              {TotalCost ? Number(50).toFixed(2) : Number(0).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Grand Total
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{GrandTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {vendor !== null ? (
        <Button
          variant="contained"
          sx={{
            margin: 3,
            width: 150,
            ":hover": { backgroundColor: "#7c2e41" },
            backgroundColor: "#7c2e41",
          }}
          href="/Checkout"
          onClick={() =>
            localStorage.setItem("cart", JSON.stringify(cartItems))
          }
        >
          Order
        </Button>
      ) : (
        <>
          {isAuthenticated ? (
            <Button
              variant="contained"
              sx={{
                margin: 3,
                width: 150,
                ":hover": { backgroundColor: "#7c2e41" },
                backgroundColor: "#7c2e41",
              }}
              href="/Checkout"
              onClick={() =>
                localStorage.setItem("cart", JSON.stringify(cartItems))
              }
            >
              Buy Now
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                margin: 3,
                ":hover": { backgroundColor: "#7c2e41" },
                backgroundColor: "#7c2e41",
              }}
              href="/Login"
            >
              Login to Order
            </Button>
          )}
        </>
      )}
    </TableContainer>
  );
}
