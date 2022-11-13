
import Animation from "./Animation";
import {useParams} from "react-router-dom"
import Records from '../../data.json';
import { CartContext } from "../../CartContext";
import { useContext } from "react";

export default function ItemDetails() {
    const {productId} = useParams()
    const thisProduct = Records.find(record => record.id === productId)
    const {cart, addToCart} = useContext(CartContext)

    const handleCart = () => {
        addToCart(thisProduct)
    }

    return (
        <div className="details" id="details">
            <div className="animationContainer" id="animationContainer">
                <div className="coverContainer">
                    <img src={thisProduct.cover} alt="cover" className="coverSong"/>
                </div>
                <Animation/>
            </div>
            <div className="detailsContainer">
                <div>
                    <div className="songDetails">
                        <p className="titleSong">{thisProduct.title}</p>
                        <p className="albumSong">"{thisProduct.album}" - {thisProduct.artist}</p>
                    </div>
                    <div className="priceSong">
                        <p>{thisProduct.price}€</p>
                    </div>
                    <div className="genreSong">
                        <p>Genre : <strong>{thisProduct.genre}</strong></p>
                    </div>
                    <p className="addToCartBtn" onClick={handleCart}>Ajouter au panier</p>
                </div>
            </div>
        </div>
    )
}