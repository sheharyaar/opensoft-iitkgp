import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import "./styles.css";
import { useSelector } from "react-redux";
import baseUrl from '../../state/urls'

export default function Demo() {
  const user = useSelector((state) => state.Login.items);
  const [loyalty, setloyalty] = useState("Loading...")
  const [loyaltyError, setloyaltyError] = useState(null)
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  }
  
  useEffect(() => {
    fetch(`${baseUrl}/nonEssentials/Loyalty`, {
      method: "GET",
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        setloyalty(json.points)
      })
      .catch((error) => {setloyaltyError(error)});
  }, [])
  
  return (
    <Box
      sx={{
        width: "80%",
        height: "350px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        marginLeft: "135px",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 250,
          width: 250,
          marginLeft: "100px",
          borderRadius: "50%",
        }}
        alt="The house from the offer."
        src={require("../images/avatar-placeholder.png")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 3,
          marginLeft: "120px",
          minWidth: { md: 350 },
        }}
      >
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Name: <span className="detail1">{user.full_name}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Phone Number: <span className="detail2">{user.phone}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Email Id: <span className="detail3">{user.email}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Address: <span className="detail4">{user.street}</span>
        </Box>
        <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
          Loyalty Score: {loyaltyError === null ? <span className="detail5">{loyalty}</span>:<span className="detail5">Non-Essential Services are down. Sorry for inconvinience.</span>}
        </Box>
      </Box>
    </Box>
  );
}
