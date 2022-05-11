import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";

function Footer() {
  return (
    <>
      <Box padding={"20px 0"}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}>
          <Typography color="white" variant="h4">
            Maji Krypt
          </Typography>
          <Box display="flex" gap="20px">
            {["Market", "Exchanges", "Tutorials", "Wallets"].map((item) => (
              <Typography key={item} color="white" variant="body2">
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Typography variant="body2" color={"white"} textAlign="center">
          Come join us
        </Typography>
        <br />
        <Divider sx={{ background: "gray" }} />
      </Box>
    </>
  );
}

export default Footer;
