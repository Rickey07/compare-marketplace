import "./header.css";
import Logo from "../../assets/Logo1.png";
import { GitHub, Moon } from "react-feather";

const Header = () => {
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
          <Moon size={40}/>
          <GitHub size={40} cursor={'pointer'}/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
