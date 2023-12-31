import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Navigate } from "react-router-dom";
import { APP_CONFIGS } from "./models";
import { AuthContextProvider } from "./context/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { isAuthenticated } from "./helpers/isAuthenticated";
function App() {

  // Client ID For google Login (use your own Id)
  const googleClientId = APP_CONFIGS.GOOGLE_CLIENT_ID

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
      <GoogleOAuthProvider clientId={`${googleClientId}`}>
      <AuthContextProvider >
        <Header />
        <Routes>
          <Route path="/" element={ isAuthenticated() ? <Navigate to={"/dashboard"}/>: <Login />} />
          <Route path="/dashboard" element={<PrivateRoute children={<Dashboard />}/> } />
        </Routes>
      </AuthContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
