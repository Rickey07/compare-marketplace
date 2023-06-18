import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import { AuthContextProvider } from "./context/Auth/Auth";
import Login from "./pages/Login/Login";

function App() {
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
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },  
  }}
/>
      <AuthContextProvider>
        <Header />
        <Login />
      </AuthContextProvider>
    </>
  );
}

export default App;
