import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUser } from "../../../state/action-creators";

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login.items);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const vendor = localStorage.getItem('vendor')
  useEffect(() => {
    if (user.length !== 0) {
      setAuthenticated(true);
    }
  }, [user]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="x2" sx={{ backgroundColor: "#fef6f0" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins, sans-serif",
              fontSize: "32px",
              fontWeight: "800",
              color: "#000000",
            }}
          >
            ATF
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/Home" underline="none" color="black">
              <Button
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Home
              </Button>
            </Link>

            <Link href="/Menu" underline="none" color="black">
              <Button
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Menu
              </Button>
            </Link>
          </Box>
          {vendor === null ? (
            <>
              {!isAuthenticated ? (
                <div>
                  <Button
                    href="/Login"
                    variant="contained"
                    sx={{
                      my: 1,
                      mx: 1.5,
                      ":hover": { backgroundColor: "#7c2e41" },
                      backgroundColor: "#7c2e41",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    href="/Signup"
                    variant="outlined"
                    sx={{
                      my: 1,
                      mx: 1.5,
                      borderColor: "#7c2e41",
                      color: "#7c2e41",
                      ":hover": { borderColor: "#7c2e41" },
                    }}
                  >
                    SignUp
                  </Button>
                </div>
              ) : (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link href="/Dashboard" underline="none" color="black">
                        <Typography textAlign="center">Profile</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        href="/Home"
                        onClick={() => {
                          localStorage.removeItem("user");
                          dispatch(LogoutUser());
                        }}
                        underline="none"
                        color="black"
                      >
                        <Typography textAlign="center">Logout</Typography>
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </>
          ) : null}
          ;
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
