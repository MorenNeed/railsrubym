import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import axios from "axios";
import { Divider, Link } from "@mui/material";
import Cart from "../cart/Cart";

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartVisible, setCartVisible] = React.useState(false);

  const pages =
    props.signed && props.current_user.role === "ADMIN"
      ? [
          { label: "Products", type: "link", data: "/items" },
          { label: "Manage Products", type: "link", data: "/items/manage"},
          { label: "Manage Users", type: "link", data: "/users" },
          { label: "Manage Orders", type: "link", data: "/orders" },
          { label: "Cart", type: "action", data: "toggleCartVisibility" },
        ]
      : [
          { label: "Products", type: "link", data: "/items" },
          { label: "Cart", type: "action", data: "toggleCartVisibility" },
        ];
  const settings = props.signed
    ? [
        {
          label: "My Account",
          type: "link",
          data: `/users/${props.current_user.id}`,
        },
        { label: "My Orders", type: "link", data: `/orders/${props.current_user.id}`},
        { label: "Logout", type: "action", data: "handleLogout" },
      ]
    : [
        { label: "Login", type: "link", data: "/auth/login" },
        { label: "Register", type: "link", data: "/auth/register/sign_up" },
      ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClick = (data) => {
    switch (data) {
      case "toggleCartVisibility":
        // Code to toggle cart visibility
        toggleCartVisibility();
        break;
      case "handleLogout":
        // Code to handle logout
        handleLogout();
        break;
      default:
        console.error("Invalid data value:", data);
    }
  };

  const handleLogout = () => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    axios
      .delete("/auth/signout", {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        backgroundColor: "#1C1E22",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="logo.svg"
              alt="Logo"
              sx={{ height: "40px", marginRight: "16px" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              MY WEBSITE
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page.type === "action" ? (
                  <MenuItem
                    key={page.label}
                    onClick={() => {
                      handleClick(page.data);
                      handleCloseNavMenu;
                    }}
                  >
                    <Typography textAlign="center" color="primary">
                      {page.label}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{
                          height: "100%",
                          width: "100%",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        href={page.data}
                      >
                        {page.label}
                      </Link>
                    </Typography>
                  </MenuItem>
                )
              )}
              <Divider/>
              {settings.map((setting) =>
                setting.type === "action" ? (
                  <MenuItem
                    key={setting.label}
                    onClick={() => handleClick(setting.data)}
                  >
                    <Typography textAlign="center" color="error">
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                    >
                      <Link
                        style={{
                          height: "100%",
                          width: "100%",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        href={setting.data}
                      >
                        {setting.label}
                      </Link>
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {pages.map((page) =>
              page.type === "action" ? (
                <Button
                  key={page.label}
                  sx={{ mx: 1, color: "white", textTransform: "capitalize" }}
                  onClick={() => {
                    handleClick(page.data);
                    handleCloseNavMenu;
                  }}
                >
                  <Typography textAlign="center" color="primary">
                    {page.label}
                  </Typography>
                </Button>
              ) : (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ mx: 1, color: "white", textTransform: "capitalize" }}
                >
                  <Link
                    style={{
                      height: "100%",
                      width: "100%",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    href={page.data}
                  >
                    {page.label}
                  </Link>
                </Button>
              )
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2, p: 0 }}>
                <Avatar alt="User Avatar" src="avatar.jpg" />
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
              {settings.map((setting) =>
                setting.type === "action" ? (
                  <MenuItem
                    key={setting.label}
                    onClick={() => handleClick(setting.data)}
                  >
                    <Typography textAlign="center" color="error">
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                    >
                      <Link
                        style={{
                          height: "100%",
                          width: "100%",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        href={setting.data}
                      >
                        {setting.label}
                      </Link>
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
            <Cart isOpen={cartVisible}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
