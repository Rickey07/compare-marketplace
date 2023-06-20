import Searchbar from "../../components/Searchbar/Searchbar";
import "./dashboard.css";
import Chip from "../../components/Chip/Chip";
import { useState } from "react";

const Dashboard = () => {
  const categories = ["Tech Giants", "Fashion", "Healthcare"];
  const [selectedCategory,setSelectedCategory] = useState("")

  const handleClick = (text:string) => {
    setSelectedCategory(text)
  };
  const handleChange = () => {
    alert("ehllo")
  }
  return (
    <div className="main-dashboard-container">
      <div className="dashboard">
        <div className="search-bar-container">
          <Searchbar handleChange={handleChange}/>
        </div>
        <div className="categories-container-wrapper">
          <h3>Categories</h3>
          <div className="categories-container">
            {categories?.map((category) => {
              return (
                <Chip
                  key={category}
                  isActive={selectedCategory===category}
                  text={category}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
