import './card.css';
import { IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import { useContext } from "react";

export default function VinylCard(props) {

    const { addToCart } = useContext(CartContext);
    
    const handleCart = () => {
        addToCart(props.record)
    }

    return(
        <div className='vinylItem'>
            
            <div key={props.id} className='productCard'>
            <Link to={`/product/${props.record.id}`}>
                <img src={props.record.cover} alt='product-img' className='productImage'></img>
                
            </Link>
                <div className='itemDescription'>
                <Link to={`/product/${props.record.id}`}>
                    <div className='headerItem'>
                        <div><h3 className='productName'>{props.record.title} - {props.record.year}</h3></div>
                        <div className='favBtn'> <IoHeartOutline size={25}/> </div>
                    </div>
                    <div><p className='productName'>{props.record.album}</p></div>
                    </Link>
                    <div className='itemPrice'>
                        <div className='productPrice'>{props.record.price} €</div>
                        <div className='cartBtn' onClick={handleCart} >Ajouter au panier</div>
                    </div>
                </div>
            </div>
        </div>
    )
}