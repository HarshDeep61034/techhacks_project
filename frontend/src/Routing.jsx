import React from "react";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
import Bounties from "./pages/Bounties.jsx";
import CreateBounty from "./pages/CreateBounty.jsx";
import BountyPage from "./pages/BountyPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage.jsx";
const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Bounties />} />
          <Route path="/bountyCreate" element={<CreateBounty />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bountypage/:id" element={<BountyPage />} />
          <Route path="/checkoutPage" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
