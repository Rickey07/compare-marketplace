import "./header.css";
import Logo from "../../assets/Logo1.png";
import { GitHub } from "react-feather";
import { GrLogout } from "react-icons/gr";
import useAuthContext from "../../context/Auth/useAuthContext";

const Header = () => {

  const contextValue = useAuthContext()


  const handleLogout = () => {
    // Implement Logout Logic here
  }

  return (
    <header className="header" id="header">
      <nav className="nav-bar">
        <div className="title-container">
          <div className="image-container">
            <img src={Logo} alt={"Logo"} className={"logo"}></img>
          </div>
          <h1 className="app-heading">CompareHub</h1>
        </div>
        <div className="nav-icons-container">
         {contextValue?.authState?.token !=="" &&  <GrLogout size={40} cursor={"pointer"} onClick={handleLogout}/>}
          <GitHub size={40} cursor={'pointer'}/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
