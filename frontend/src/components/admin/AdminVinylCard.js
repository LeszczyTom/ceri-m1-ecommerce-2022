import './admin-card.css';
import { IoTrashBinOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import { useContext } from "react";
import { useState } from "react";

export default function AdminVinylCard(props) {

    const { addToCart } = useContext(CartContext);
    const [stock, setStock] = useState(props.record.stock);

    const handleDelete = (id) => {
        console.log("Album " + id + " supprimé")
    }

    const handleUpdate = (id, stock) => {
        console.log("Album " + id + " a maintenant " + stock + " unités")
    }

    return(
        <div className='vinylItem'>
            
            <div key={props.id} className='productCard'>

                <img src={props.record.cover} alt='product-img' className='productImage'></img>
                
                <div className='itemDescription'>
                    <div className='headerItem'>
                        <div><h3 className='productName'>{props.record.name} - {props.record.year}</h3></div>
                        <div className='delBtn' onClick={()=>{handleDelete(props.record.id)}} > <IoTrashBinOutline size={25}/> </div>
                    </div>
                    <div><p className='productName'>{props.record.album}</p></div>
                    <div className='itemStock'>
                        <div className='productStock'> <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}}></input> unités </div>
                        <div className='cartBtn' onClick={()=>{handleUpdate(props.record.id, 0)}} >Mettre à jour</div>
                    </div>
                </div>
            </div>
        </div>
    )
}