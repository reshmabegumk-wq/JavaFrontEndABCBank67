import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import Services from "./Components/Services/Services";
import Transactions from "./Components/Transaction/Transactions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/transactions"
          element={
            <Layout>
              <Transactions />
            </Layout>
          }
        />

        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
