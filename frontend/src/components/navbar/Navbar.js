import logo from './logo.png';
import './navbar.css';
import { IoCartOutline, IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from '../../CartContext';
import { useContext } from 'react';
import Cookie from 'universal-cookie';
import { useState } from 'react';

const Navbar = (props) => {

  const cookies = new Cookie()
  const {cart} = useContext(CartContext)
  const [search, setSearch] = useState('');

  const handleSearch = (search) => {
    
  }


  return (
    <div className="navbar">
        <div><Link to={"/"}><img src={logo} className="App-logo" alt="logo" /></Link></div>
        <div className="navlink"><Link to={"/"}>Catalogue</Link></div>
        <div className="icons">
          <input type="text" 
            placeholder="Rechercher un album..." 
            id="search"
            className="searchBar navlink"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKe
          />
            <IoSearchOutline className='search' size={25}/>
            <Link to={cookies.get('role')==="admin" ? "/backoffice" : "/user-form"}>
              <IoPersonOutline className='profile' size={25}/>
            </Link>
            <Link to={"/cart"}><IoCartOutline size={25}/>
              <span class='badge badge-warning' id='lblCartCount'> {cart.reduce((total, item) => total + item.quantity, 0)} </span>
            </Link>
        </div>
    </div>
  );
}

export default Navbar;
