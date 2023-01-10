import './cart.css';
import { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { useEffect, useState } from 'react';

function Cart() {
    const [allAlbums, setAllAlbums] = useState([]);
    const { cart, total, addToCart, clearItem, removeFromCart, clearCart } = useContext(CartContext);
    const handleLogin = () => {
        if(sessionStorage.getItem('userStatus') === 'false') {
            alert("Vous devez être connecté pour passer au paiement");
        } else {
            console.log(cart);
        }
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + '/albums')
        .then(response => response.json())
        .then(data => {
            setAllAlbums(data);
        })
    }, []);


    if (cart.length === 0 || allAlbums.length === 0) {
        return (
            <div className="cart">
                <h1>Votre panier est vide</h1>
            </div>
        );
    }
    return (
        <div className="shopping-cart">
            {cart.map((item) => (
                <div className="item">
                    <button className="del-btn" onClick={() => clearItem(item, item.quantity)}>&times;</button>

                    <div className="image">
                        <img src={allAlbums.find(album => album.id === item.Album.id).cover} alt="cover"/>
                    </div>

                    <div className="description">
                        <span>{allAlbums.find(album => album.id === item.Album.id).name}</span>
                    </div>

                    <div className="quantity">
                    <button className="plus-btn" type="button" name="button" onClick={() => addToCart(item.Album.id)}>
                        +
                    </button>
                    <input type="number" name="name" value={item.quantity}/>
                    <button className="minus-btn" type="button" name="button" onClick={() => removeFromCart(item.Album.id, 1)}>
                        -
                    </button>
                    </div>

                    <div className="total-price">{(item.quantity * allAlbums.find(album => album.id === item.Album.id).price).toFixed(2)}€</div>
                </div>
            ))}
            <div>
                <div className="total" style={{padding: "50px"}}>
                    <p>Total</p>
                    <p>{total}€</p>
                    <a className="clear-cart-btn" onClick={handleLogin}>Acheter</a>
                    <a className="clear-cart-btn" onClick={clearCart}>Vider le panier</a>
                </div>
            </div>
        </div>
    );
}


    /*
    return (
        <div className="cart">
            <div className="cartContainer">
                <div className="cartTitle">
                    <h1>Votre panier</h1>
                </div>
                <div className="cartItems">
                    {cart.map((item) => (
                        <div className="cartItem">
                            <div className="cartItemImg">
                                <img src={item.cover} alt="cover" />
                            </div>
                            <div className="cartItemDetails">
                                <p className="cartItemTitle">{item.title}</p>
                                <p className="cartItemAlbum">{item.album}</p>
                                <p className="cartItemArtist">{item.artist}</p>
                                <p className="cartItemPrice">{item.price}€</p>
                                <p className="cartItemQuantity">Quantité : {item.quantity}</p>
                            </div>
                            <div className="cartItemRemove">
                                <p onClick={() => removeFromCart(item)}>X</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cartTotal">
                    <p>Total : {total}€</p>
                </div>
                <div className="cartClear">
                    <p onClick={clearCart}>Vider le panier</p>
                </div>
            </div>
        </div>
    )*/


export default Cart;