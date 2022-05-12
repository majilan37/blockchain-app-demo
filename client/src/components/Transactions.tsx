import React from "react";
import { useTranscation } from "../context/Transactions";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useGiphy } from "../hooks";

function TransactionCard({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
}: {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: string | number;
}) {
  const giphy = useGiphy(keyword);
  return (
    <Box maxWidth={"300px"} position="relative">
      <Card sx={{ backgroundColor: "#181918" }}>
        <CardContent>
          <Typography component={"p"} color={"white"} variant="body2">
            From: {addressFrom}{" "}
          </Typography>
          <Typography
            gutterBottom
            component={"p"}
            color={"white"}
            variant="body2">
            To: {addressTo}{" "}
          </Typography>
          <Button
            component="a"
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            variant="contained"
            color="primary">
            <span style={{ textTransform: "capitalize" }}>Details</span>
          </Button>
        </CardContent>
        <CardMedia component={"img"} image={giphy} height="194" />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            background: "#2e2e2e",
            padding: "10px 15px",
            color: "cyan",
            borderRadius: 50,
            fontSize: "14px",
            left: "40px",
            right: "40px",
            textAlign: "center",
          }}>
          {timestamp}
        </div>
      </Card>
    </Box>
  );
}

function Transactions() {
  const { currentAccount, transactions } = useTranscation();
  return (
    <div>
      {currentAccount ? (
        <Box>
          <Typography
            variant="h4"
            color={"white"}
            gutterBottom
            textAlign="center">
            Latest Transactions
          </Typography>
          <Box>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionCard
                  addressTo={transaction.addressTo}
                  addressFrom={transaction.addressFrom}
                  timestamp={transaction.timestamp}
                  message={transaction.message}
                  keyword={transaction.keyword}
                  amount={transaction.amount}
                />
              ))
            ) : (
              <Typography
                variant="subtitle1"
                textAlign={"center"}
                gutterBottom
                color="white">
                You have no transactions
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" color={"white"} textAlign="center">
            Connect Your wallet to see <br /> your latest transactions
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default Transactions;
