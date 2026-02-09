import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import DebitCard from "./Components/Services/DebitCard";
import Checkbook from "./Components/Services/Checkbook";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login without sidebar */}
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

        {/* Services */}
        <Route
          path="/services/debit-card"
          element={
            <Layout>
              <DebitCard />
            </Layout>
          }
        />

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
