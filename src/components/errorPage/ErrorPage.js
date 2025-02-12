import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ code = 404, message = "Page Not Found" }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
      }}
    >
      <Typography variant="h1" color="error">
        {code}
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/home")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
