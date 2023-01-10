import './admin-card.css';
import { IoTrashBinOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import { useContext } from "react";
import { useState } from "react";

export default function AdminVinylCard(props) {

    const { addToCart } = useContext(CartContext);
    const [stock, setStock] = useState(props.record.stock);

    const handleUpdate = (id, newstock) => {
        //fetch delete
        fetch(process.env.REACT_APP_SERVER_URL + '/update_stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                album_id: id,
                stock: newstock
            })

        }).then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.reload();
        })
    }

    const handleDelete = (id) => {
        //fetch delete
        fetch(process.env.REACT_APP_SERVER_URL + '/delete_album/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                
            },
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.reload();
        })
    }


    return(
        <div className='vinylItem'>
            
            <div key={props.id} className='productCard'>

                <img src={props.record.cover} alt='product-img' className='productImage'></img>
                
                <div className='itemDescription'>
                    <div className='headerItem'>
                        <div><h3 className='productName'>{props.record.name} - {props.record.year}</h3></div>
                        <div className='delBtn' onClick={()=>{handleDelete(props.record.id)}}> <IoTrashBinOutline size={25}/> </div>
                    </div>
                    <div><p className='productName'>{props.record.album}</p></div>
                    <div className='itemStock'>
                        <div className='productStock'> <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}}></input> unités </div>
                        <div className='cartBtn' onClick={()=>{handleUpdate(props.record.id, stock)}} >Mettre à jour</div>
                    </div>
                </div>
            </div>
        </div>
    )
}