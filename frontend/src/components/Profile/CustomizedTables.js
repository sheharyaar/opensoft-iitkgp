import * as React from "react";
import { GroupingState, IntegratedGrouping } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@mui/material/Paper";
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../state/action-creators";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.Login.items);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user.customer_id !== undefined) {
      dispatch(getOrders(user.customer_id));
    }
    setRows(
      orders.items
        .map((item) => ({
          date: getDate(item.CreatedAt),
          orderId: item.order_id + " | " + item.status.toUpperCase(),
          itemName: item.item_name.toUpperCase(),
          amount: item.price * item.quantity,
        }))
        .reverse()
    );
  }, [user]); 

  function getDate(orderDate) {
    const date = new Date(orderDate);
    return date.toLocaleString();
  }

  const [columns] = useState([
    { name: "date", title: "Date" },
    { name: "orderId", title: "Order ID" },
    { name: "itemName", title: "Item Name" },
    { name: "amount", title: "Amount" },
  ]);

  return (
    <Paper
      sx={{
        width: "80%",
        alignItems: "center",
        borderRadius: "12px",
        boxShadow: 1,
        marginLeft: "135px",
      }}
    >
      <Grid rows={rows} columns={columns}>
        <GroupingState grouping={[{ columnName: "orderId" }]} />
        <IntegratedGrouping />
        <Table />
        <TableHeaderRow />
        <TableGroupRow />
      </Grid>
    </Paper>
  );
}
