import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthContextProvider } from "./context/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
function App() {
  // Custom ROUTER 
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <GoogleOAuthProvider clientId="272481611816-9fc8mfgiqk1sdkrgv6s051orka1n5rh4.apps.googleusercontent.com">
      <AuthContextProvider >
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute children={<Dashboard />}/> } />
        </Routes>
      </AuthContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
