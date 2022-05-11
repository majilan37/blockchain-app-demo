import {
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import Loader from "./Loader";
import { InfoOutlined } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTranscation } from "../context/Transactions";

const features = [
  {
    title: "Reliability",
    rounded: true,
    topLeft: true,
  },
  {
    title: "Security",
  },
  {
    title: "Blockchain",
    rounded: true,
    topRight: true,
  },
  {
    title: "Scalability",
    rounded: true,
    bottomLeft: true,
  },
  {
    title: "Web 3.0",
  },
  {
    title: "Ethereum",
    rounded: true,
    bottomRight: true,
  },
];

const StyledTextField = styled(TextField)`
  /* default */
  .MuiInput-underline:before {
    border-bottom: 1px solid gray;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid gray;
  }
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid white;
  }
`;

function Input({
  name,
  label,
  type,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <StyledTextField
      name={name}
      variant="standard"
      label={label}
      type={type}
      // step="0.0001"
      // InputProps={{
      //   step: "0.001",
      // }}
      margin="dense"
      InputLabelProps={{
        style: {
          color: "lightgray",
        },
      }}
      value={value}
      fullWidth
      inputProps={{ style: { color: "white" } }}
      onChange={onChange}
    />
  );
}

function Welcome() {
  const [loading, setLoading] = useState(false);
  const { connectWallet, currentAccount, onChange, formData, sendTransaction } =
    useTranscation();
  const { addressTo, amount, keyword, message } = formData;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) {
      return alert("Please fill all the fields");
    }

    sendTransaction();
  };
  console.log(currentAccount);
  return (
    <Box
      display={{ xs: "block", md: "flex" }}
      justifyContent="center"
      gap="30px"
      padding={"40px 0"}>
      <Box
        flex={"0.5"}
        p={{ xs: "20px", md: "0" }}
        maxWidth={{ xs: "450px", lg: "100%" }}
        mx={{ xs: "auto", md: 0 }}
        display="flex"
        flexDirection="column"
        gap="10px"
        color="white">
        <Typography variant="h2">
          Buy ans sell <br /> trusted Crypto
        </Typography>
        <Typography component={"p"}>
          Explore the crypto market and find the best deals, Buy and Sell Crypto
          easily on Maji Krypt
        </Typography>
        {!currentAccount && (
          <Button
            sx={{ borderRadius: "30px" }}
            variant="contained"
            fullWidth
            disableElevation
            onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
        <Grid sx={{ mt: 3 }} container>
          {features.map((item, index) => (
            <Grid
              key={index}
              border="1px solid"
              textAlign={"center"}
              padding={"10px"}
              item
              xs={4}>
              {item.title}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        maxWidth={{ xs: "450px", lg: "100%" }}
        mx={{ xs: "auto", md: 0 }}
        mt={{ xs: "40px", md: 0 }}
        flex={"0.5"}>
        <div
          style={{
            height: "150px",
            width: "300px",
            borderRadius: "10px",
            margin: "auto",
            position: "relative",
          }}
          className="eth-card white-glassmorphism">
          <div className="eth-card-top">
            <div className="eth-card-icon">
              <Icon icon="mdi:ethereum" color="white" height={"24px"} />
            </div>
            <InfoOutlined sx={{ color: "white" }} />
          </div>
          <div className="eth-card-bottom">
            <Typography variant="body2" color="white">
              {currentAccount?.substring(0, 5)}...
              {currentAccount?.substring(
                currentAccount.length - 1,
                currentAccount.length
              )}
            </Typography>

            <Typography
              component={"strong"}
              variant="body1"
              color="white"
              fontWeight={"bold"}>
              Ethereurm
            </Typography>
          </div>
        </div>
        <Box p={2} maxWidth="500px" margin={"20px auto"} bgcolor="#0d274f">
          <form onSubmit={onSubmit} action="">
            <Input
              name="addressTo"
              label="Address To"
              type="text"
              value={addressTo}
              onChange={onChange}
            />
            <Input
              name="amount"
              label="Amount (ETH)"
              type="number"
              value={amount}
              onChange={onChange}
            />
            <Input
              name="keyword"
              label="Keyword (Gif)"
              type="text"
              value={keyword}
              onChange={onChange}
            />
            <Input
              name="message"
              label="Enter Message"
              type="text"
              value={message}
              onChange={onChange}
            />
            <Box>
              <LoadingButton
                loading={loading}
                type="submit"
                sx={{ mt: 2 }}
                variant="contained"
                disabled={!currentAccount}
                fullWidth>
                Send Now
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Welcome;
