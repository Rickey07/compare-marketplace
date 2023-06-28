import Searchbar from "../../components/Searchbar/Searchbar";
import "./dashboard.css";
import Chip from "../../components/Chip/Chip";
import { useEffect, useMemo, useState } from "react";
import { APP_CONFIGS } from "../../models";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/Table/Table";


type Product = {
  name?:string,
  amz_price?:string,
  flip_price?:string
}

const Dashboard = () => {
  const categories = ["Tech Giants", "Fashion", "Healthcare"];
  const [selectedCategory,setSelectedCategory] = useState("")
  const [keyword,setKeyword] = useState("")
  const [ProductsData,setProductsData] = useState({
    dataAfterComparison:[]

  })
  const [loaderVisible,setLoaderVisible] = useState(false)
  const url = APP_CONFIGS.API_BASE_URL 
  const modifiedURL = `${url}/products/?source=amazon,flipkart,myntra&keyword=${keyword}&page=1`

  const columnHelper = createColumnHelper<Product>()

  const columns = useMemo(() => [
    columnHelper.accessor('name',{
      header:"Product Name",
    }),
    columnHelper.accessor('amz_price',{
      header:"Amazon Price"
    }),
    columnHelper.accessor('flip_price',{
      header:"Flipkart Price",
      
    }),
],[])

  const handleClick = (text:string) => {
    setSelectedCategory(text)
  };
  const handleChange = (e:{target:HTMLInputElement,key:KeyboardEvent}):void => {
    if(String(e.key) === "Enter" || e.target.value === "") {
      if(e.target.value.toLowerCase() !== keyword) {
        setKeyword(e.target.value.toLowerCase())
      }
    }
  }

  useEffect(() => {
    if(keyword!=="" && selectedCategory!=="") {
      getProducts()
    }
  },[selectedCategory,keyword])

  async function getProducts () {
    try {
      setLoaderVisible(true)
      const data = await axios.get(modifiedURL)
      console.log(data.data)
      setProductsData(data.data)
      setLoaderVisible(false)
    } catch (error:any) {
      console.log(error)
    }
  }
  

  return (
    <>
    <Loader visible={loaderVisible}/>
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
           { ProductsData && <Table columns={columns} data={ProductsData?.dataAfterComparison}/>}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
