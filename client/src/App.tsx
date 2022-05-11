import React, { Suspense } from "react";
import { Container } from "@mui/material";
import { Header, Services, Transactions, Welcome } from "./components";

function App() {
  const Footer = React.lazy(() => import("./components/Footer"));
  const Transactions = React.lazy(() => import("./components/Transactions"));
  return (
    <div className="gradient-bg-welcome">
      <Header />
      <Container className="">
        <div className="">
          <Welcome />
        </div>
        <Services />
        <Suspense fallback={<div>Loading...</div>}>
          <Transactions />
          <Footer />
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
