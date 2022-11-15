import logo from './logo.png';
import './navbar.css';
import { IoCartOutline, IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from '../../CartContext';
import { useContext } from 'react';

const Navbar = (props) => {

  const {cart} = useContext(CartContext)

  return (
    <div className="navbar">
        <div><Link to={"/"}><img src={logo} className="App-logo" alt="logo" /></Link></div>
        <div className="navlink"><Link to={"/"}>Inspiration</Link></div>
        <div className="navlink"><Link to={"/"}>Catalogue</Link></div>
        <div className="navlink"><Link to={"/"}>À propos</Link></div>
        <div className="navlink"><Link to={"/"}>Contact</Link></div>
        <div className="icons">
          <input type="text" 
            placeholder="Rechercher un titre..." 
            id="search"
            value={props.keyword}
            onChange={(e) => props.setKeyword(e.target.value)}
            className="searchBar navlink"
          />
            <IoSearchOutline className='search' size={25}/>
            <Link to={"/user-form"}>
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
