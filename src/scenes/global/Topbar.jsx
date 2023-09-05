import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";

const Topbar = ({ token, setToken }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  let navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      sessionStorage.removeItem("token");
      setToken(false);
      navigate("/");
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[400]}
    >
      {/* Title */}
      <Box display="flex" alignItems="center">
        <Typography variant="h5" color={colors.grey[100]}>
          Dashboard
        </Typography>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
