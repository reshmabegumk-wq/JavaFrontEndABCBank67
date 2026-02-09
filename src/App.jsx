import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import DebitCard from "./Components/Services/DebitCard";
import Checkbook from "./Components/Services/Checkbook";
import CreditCard from "./Components/Services/CreditCard";
import DebitCardRequest from "./Components/Services/DebitCardRequest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* Debit Card List Page */}
        <Route
          path="/services/debit-card"
          element={
            <Layout>
              <DebitCard />
            </Layout>
            
          }
        />

          {/* NEW: Debit Card Request Page */}
        <Route
          path="/services/debit-card-request"
          element={
            <Layout>
              <DebitCardRequest />
            </Layout>
          }
        />

      
        <Route
  path="/services/credit-card"
  element={
    <Layout>
      <CreditCard />
    </Layout>
  }
/>


        {/* Checkbook */}
        <Route
          path="/services/checkbook"
          element={
            <Layout>
              <Checkbook />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
