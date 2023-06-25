import Searchbar from "../../components/Searchbar/Searchbar";
import "./dashboard.css";
import Chip from "../../components/Chip/Chip";
import { useEffect, useState } from "react";
import { APP_CONFIGS } from "../../models";
import axios from "axios";

const Dashboard = () => {
  const categories = ["Tech Giants", "Fashion", "Healthcare"];
  const [selectedCategory,setSelectedCategory] = useState("")
  const [keyword,setKeyword] = useState("")
  const [ProductsData,setProductsData] = useState([])
  const url = APP_CONFIGS.API_BASE_URL 
  const modifiedURL = `${url}/products/?source=amazon,flipkart,myntra&keyword=${keyword}&page=1`

  const handleClick = (text:string) => {
    setSelectedCategory(text)
  };
  const handleChange = (e:{target:HTMLInputElement}):void => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    if(keyword!=="" && selectedCategory!=="") {
      getProducts()
    }
  },[selectedCategory,keyword])

  async function getProducts () {
    try {
      const data = await axios.get(modifiedURL)
      setProductsData(data.data)
    } catch (error:any) {
      console.log(error)
    }
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
        <div className="table-container">
            
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
