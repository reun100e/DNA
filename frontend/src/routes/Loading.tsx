import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const Loading = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={true}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" size={50} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Connecting to Server, please wait...
          </Typography>
        </Box>
      </Backdrop>
    );
  }

  return <Outlet />;
};

export default Loading;
