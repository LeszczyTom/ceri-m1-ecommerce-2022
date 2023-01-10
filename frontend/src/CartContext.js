import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const cookies = new Cookies();
    const userId = cookies.get("role");

    const addToCart = (albumid) => {
        /*if (cart.find((cartItem) => cartItem.id === item.id && cartItem.quantity < item.stock)) {
            setCart(
                cart.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                        };
                    } else {
                        return cartItem;
                    }
                })
            );
        } 
        
        else if (cart.find((cartItem) => cartItem.id === item.id && cartItem.stock === item.stock)) {
            alert("Vous avez atteint la limite de stock disponible pour cet article");
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }*/
        fetch(process.env.REACT_APP_SERVER_URL + '/add_album_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: 1,
                user_id: userId,
                albums_id: albumid
            })
        }).then(response => response.json())
        .then(data => {
            console.log("add album to cart = ", data)
            window.location.reload();
        })
    };
    
    const removeFromCart = (albumid, quantity) => {
        fetch(process.env.REACT_APP_SERVER_URL + '/rem_album_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: quantity,
                user_id: userId,
                albums_id: albumid
            })
        }).then(response => response.json())
        .then(data => {
            console.log("remove album from cart = ", data)
            window.location.reload();
        })
    };

    const clearItem = (item, quantity) => {
            removeFromCart(item.Album.id, quantity);
    };
    
    const clearCart = () => {
        for (let i = 0; i < cart.length; i++) {
            clearItem(cart[i], cart[i].quantity);
        }
        setCart([]);
    };
    
    useEffect(() => {
        if (userId && userId  !== 'admin') {
            fetch(process.env.REACT_APP_SERVER_URL + '/cart/'+ userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                console.log("cart = ", data)
                console.log("userId = ", userId)
                setCart(data);
                for (let i = 0; i < data.length; i++) {
                    setTotal(total + (data[i].quantity * data[i].Album.price));
                }
                
            })
        }
    }, []);
    
    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearItem,
        clearCart,
        total,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
