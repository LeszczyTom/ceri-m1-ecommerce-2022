
import Animation from "./Animation";
import {useParams} from "react-router-dom"
import { CartContext } from "../../CartContext";
import { useContext, useEffect } from "react";
import { useState } from "react";

export default function ItemDetails() {
    const {productId} = useParams()
    const [thisAlbum, setthisAlbum] = useState(
        {
            title: "",
            album: "",
            artist: "",
            cover: "",
            price: "",
            genre: ""
        }
    );

    const [thisArtist, setthisArtist] = useState(
        {
            name: "",
        }
    );

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + '/albums/'+productId)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setthisAlbum(data);
            if(thisAlbum.artists_id){
                fetch(process.env.REACT_APP_SERVER_URL + '/artists/'+thisAlbum.artists_id)
                .then(response => response.json())
                .then(data => {
                    console.log("data", data)
                    setthisArtist(data);
                })
            }
        })
        
    },[thisAlbum.artists_id])
 
    const {cart, addToCart} = useContext(CartContext)

    const handleCart = (albumId) => {
        addToCart(albumId)
    }

    return (
        <div className="details" id="details">
            <div className="animationContainer" id="animationContainer">
                <div className="coverContainer">
                    <img src={thisAlbum.cover} alt="cover" className="coverSong"/>
                </div>
                <Animation/>
            </div>
            <div className="detailsContainer">
                <div>
                    <div className="songDetails">
                        <p className="titleSong">{thisAlbum.name}</p>
                        <p className="albumSong">{thisArtist.name}</p>
                    </div>
                    <div className="priceSong">
                        <p>{thisAlbum.price}€</p>
                    </div>
                    <p>Stock : {thisAlbum.stock}</p>
                    <p className="addToCartBtn" onClick={()=>{handleCart(thisAlbum.id)}}>Ajouter au panier</p>
                </div>
            </div>
        </div>
    )
}