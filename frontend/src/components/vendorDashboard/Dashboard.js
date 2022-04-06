import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";
import OrderCard from "./Cards/OrderCard";
import { Button } from "@mui/material";
import baseUrl from "../../state/urls";

function Dashboard() {
  const [checked, setChecked] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const storeId =
    localStorage.getItem("vendor") === null
      ? 0
      : localStorage.getItem("vendor");
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    fetch(
      `${baseUrl}/vendors/StoreStatus?store_id=${parseInt(storeId)}&set=${
        checked ? 1 : 0
      }`
    );
  }, [checked]);

  useEffect(() => {
    fetch(`${baseUrl}/vendors/orders/GetOrders`, {
      method: "POST",
      body: JSON.stringify({
        store_id: parseInt(localStorage.getItem('vendor')),
        order_id: 0,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        var groupBy = function (xs, key) {
          return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        const customers = groupBy(data, "customer_id");
        const result = [];
        for (var key in customers) {
          const order = groupBy(customers[key], "order_id");
          const temp = [];
          for (var key1 in order) {
            temp.push({ order_id: key1, items: order[key1] });
          }
          result.push({
            customer_id: key,
            orders: temp,
          });
        }
        setOrders(result);
      });
  }, []);

  return (
    <>
      <Box>
        <Stack
          direction="row"
          spacing={5}
          py={3}
          alignItems={"center"}
          px={76}
          bgcolor={"#fef7f1"}
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Off</Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="h6">On</Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              ":hover": { backgroundColor: "#7c2e41" },
              backgroundColor: "#7c2e41",
            }}
            href="/Menu"
          >
            Add Order
          </Button>
        </Stack>
      </Box>
      <OrderCard orders={orders} />
    </>
  );
}

export default Dashboard;
