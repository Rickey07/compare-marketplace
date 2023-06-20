import './searchbar.css';
import { Search } from 'react-feather';

interface searchBarProps {
    handleChange():void,
    value?:string
}

const Searchbar = ({handleChange,value}:searchBarProps) => {
  return (
    <div className="search-bar-container">
      <input type={"text"} placeholder={"Enter Product Name to compare"} value={value} onChange={handleChange}/>
      <Search className='search-icon'/>
    </div>
  )
}

export default Searchbar