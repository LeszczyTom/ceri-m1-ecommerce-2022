import './App.css';
import ItemDetails from './components/itemDetails/ItemDetails';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ProductsList from './components/productsList/ProductsList';
import Footer from './components/footer/Footer';
import UserForm from './components/user-form/UserForm';
import Navbar from './components/navbar/Navbar';
import Cart from './components/cart/CartComponent';
import Records from './data.json'
import {useEffect, useState} from "react"
import { CartProvider } from "./CartContext";

function App() {

  const [input, setInput] = useState('');
  const [recordsList, setRecordsList] = useState();

  const fetchData = async () => {
    /*
    * TODO: Fetch data from API
    */
    setRecordsList(Records)
  }

  const updateInput = async (input) => {
    const filtered = recordsList.filter(record => {
     return record.title.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setRecordsList(filtered);
    if(input===""){
      setRecordsList(Records)
    }
 }

  useEffect( () => {fetchData()},[]);

  return (
    <div className="App">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
      </head>
      <Router>
      <CartProvider>
        <Navbar keyword={input} 
        setKeyword={updateInput}/>
          <Routes>
            <Route path="/" element={<ProductsList records={recordsList}/>}/>
            <Route path="/product/:productId" element={<ItemDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/user-form" element={<UserForm/>}/>
          </Routes>
      </CartProvider>
      </Router>
    </div>
  );
}

export default App;
