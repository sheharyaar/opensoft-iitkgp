import * as React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getStores } from "../../../../state/action-creators/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.store);
  const [city, setCity] = useState("kharagpur");

  const changeCity = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  useEffect(() => {
    console.log(city);
    dispatch(getStores(city));
  }, [city]);

  useEffect(() => {
    localStorage.setItem("selectedStore", JSON.stringify(data.items[0]));
  }, [data]);

  return (
    <>
      <div>
        <TextField
          id="outlined-basic"
          label="Search Store"
          defaultValue={"Kharagpur"}
          variant="outlined"
          sx={{ mt: 5 }}
          onChange={changeCity}
        />
        <FormControl sx={{ m: 5 }}>
          <InputLabel id="demo-customized-select-label">
            Current Store
          </InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            sx={{ width: 300 }}
            onChange={(e) => {
              localStorage.setItem(
                "selectedStore",
                JSON.stringify(e.target.value)
              );
            }}
          >
            {data.items.map((store) => {
              return (
                <MenuItem
                  value={store}
                  disabled={!store.status}
                  sx={{ justifyContent: "space-between" }}
                >
                  {store.city.toUpperCase()}, {store.store_name.toUpperCase()}{" "}
                  <Chip
                    label={store.status ? "OPEN" : "CLOSE"}
                    color={store.status ? "success" : "error"}
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
