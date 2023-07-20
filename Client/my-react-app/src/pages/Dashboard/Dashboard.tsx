import Searchbar from "../../components/Searchbar/Searchbar";
import "./dashboard.css";
import Chip from "../../components/Chip/Chip";
import { useEffect, useMemo, useState } from "react";
import { APP_CONFIGS, tableColumn } from "../../models";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import Table from "../../components/Table/Table";

const Dashboard = () => {
  const categories = ["Tech Giants", "Fashion", "Healthcare"];
  const columnWithSorting = ["amz_price", "flip_price"];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ProductsData, setProductsData] = useState({
    dataAfterComparison: [],
  });
  const [loaderVisible, setLoaderVisible] = useState(false);
  const url = APP_CONFIGS.API_BASE_URL;
  const modifiedURL = `${url}/products/?category=${selectedCategory}&keyword=${keyword}&page=1`;

  const columns = useMemo(
    () => createDynamicColumns(selectedCategory),
    [selectedCategory]
  );

  const [dynamicColumns,setDynamicColumns] =  useState(columns)

  const handleClick = (text: string) => {
    setSelectedCategory(text);
  };
  const handleChange = (e: {
    target: HTMLInputElement;
    key: KeyboardEvent;
  }): void => {
    if (String(e.key) === "Enter" || e.target.value === "") {
      if (e.target.value.toLowerCase() !== keyword) {
        setKeyword(e.target.value.toLowerCase());
      }
    }
  };

  const handleSort = (id:string,head:boolean):void => {
    console.log(id,head)
  }

  useEffect(() => {
    if (keyword !== "" && selectedCategory !== "") {
      getProducts();
    }
  }, [selectedCategory, keyword]);

  async function getProducts() {
    try {
      setLoaderVisible(true);
      const data = await axios.get(modifiedURL);
      console.log(data.data);
      setProductsData(data.data);
      setLoaderVisible(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  function createDynamicColumns(category: string): tableColumn[] {
    const columnsTechGiant: string[] = [
      "Product Name",
      "Amazon Price",
      "Flipkart Price",
      "Amazon Rating",
      "Flipkart Rating",
      "Amz_Link",
      "Flip_Link",
    ];
    const columnsFashion: string[] = [
      "Product Name",
      "Ajio Price",
      "TataCliq Price",
      "Ajio Rating",
      "TataCliq Rating",
      "Ajio_Link",
      "TataCliq_Link",
    ];
    const columnsHealthCare: string[] = [
      "Product Name",
      "1mg Price",
      "Netmeds Price",
      "1mg Rating",
      "Netmeds Rating",
      "1mg_Link",
      "Netmeds_Link",
    ];

    const columns = (
      category.includes("Tech")
        ? columnsTechGiant
        : category.includes("Fashion")
        ? columnsFashion
        : columnsHealthCare
    ).map((columnTitle: string, index) => {
      return {
        id: columnIdMapper(index),
        fieldName: columnTitle,
        isSort: columnWithSorting.includes(columnIdMapper(index)),
        ...(columnWithSorting.includes(columnIdMapper(index)) && {
          order_by: "asc",
          isSorted: false,
        }),
      };
    });
    return columns;
  }

  function columnIdMapper(id: number): string {
    switch (id) {
      case 0:
        return "name";
      case 1:
        return "amz_price";
      case 2:
        return "flip_price";
      case 3:
        return "amz_rating";
      case 4:
        return "flip_rating";
      case 5:
        return "amz_link";
      case 6:
        return "flip_link";
      default:
        return "";
    }
  }

  return (
    <>
      <Loader visible={loaderVisible} />
      <div className="main-dashboard-container">
        <div className="dashboard">
          <div className="search-bar-container">
            <Searchbar handleChange={handleChange} />
          </div>
          <div className="categories-container-wrapper">
            <h3>Categories</h3>
            <div className="categories-container">
              {categories?.map((category) => {
                return (
                  <Chip
                    key={category}
                    isActive={selectedCategory === category}
                    text={category}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="comparison-desc">
            <small>
              *Data Comparison: Amazon vs Flipkart , Data may contain
              discrepancy!
            </small>
          </div>
          <div className="table-container">
            {ProductsData?.dataAfterComparison?.length ? (
              <Table
                columns={dynamicColumns}
                data={ProductsData?.dataAfterComparison}
                onSort={handleSort}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
