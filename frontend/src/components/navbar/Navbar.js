import logo from './logo.png';
import './navbar.css';
import { IoCartOutline, IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from '../../CartContext';
import { useContext, useEffect } from 'react';
import Cookie from 'universal-cookie';
import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits  } from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/satellite.css';

const Navbar = (props) => {

  const cookies = new Cookie()
  const {cart} = useContext(CartContext)
  const [search, setSearch] = useState('');
  const [showHits, setShowHits] = useState(false);
  const [path, setPath] = useState('');

  const searchClient = algoliasearch(
    '3STRLEGLVZ',
    'a9c3ef1349d8b0c40c9a2b7381400edb'
  );

  function Hit({ hit }) {
    return (
      <a href={"/product/"+hit.objectID}><div >
        {/* <img src={hit.image} alt={hit.name} /> */}
        <span>{hit.name}</span>
        {/* <h1>{hit.name}</h1>
        <p>${hit.price}</p> */}
      </div></a>
    );
  }

  useEffect(() => {
    if (cookies.get('role') === 'admin') {
      setPath('/backoffice')
    }
    else {
      setPath('/user-form')
    }
  }, [])

  return (
    <div className="navbar">
        <div><Link to={"/"}><img src={logo} className="App-logo" alt="logo" /></Link></div>
        <div className="navlink"><Link to={"/"}>Catalogue</Link></div>
        <div className="icons">

          <div className='searchBar navlink'>
            <InstantSearch searchClient={searchClient} indexName="catalogue_albums">
            <SearchBox onFocus={()=>setShowHits(true)} onBlur={()=>setShowHits(false)}/>
            {showHits ? <Hits hitComponent={Hit} />: null}
            </InstantSearch>
          </div>

          {/* <input type="text" 
            placeholder="Rechercher un album..." 
            id="search"
            className="searchBar navlink"
            value={props.keyword}
            onChange={(e) => props.setKeyword(e.target.value)}
          /> */}
            {/* <IoSearchOutline className='search' size={25}/> */}
            
            <Link to={path}>
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
