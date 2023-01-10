import './admin.css';
import { useState, useEffect } from 'react';
import AdminVinylCard from './AdminVinylCard';
import { IoTrashBinOutline, IoCheckmarkOutline } from "react-icons/io5";


function Admin(props) {

    const [allRecords, setAllRecords] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    const [newStatus, setNewStatus] = useState('');

    /*New product form*/
    const [newProduct, setNewProduct] = useState({
        name: '',
        artist: '',
        year: '',
        price: '',
        cover: '',
        stock: '',
    });

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }


    const handleUpdateOrder = (id, newStatus) => {
        //fetch update
        fetch(process.env.REACT_APP_SERVER_URL + '/update_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                state: newStatus
            })})
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    const handleAddAlbum = () => {
        //fetch add
        fetch(process.env.REACT_APP_SERVER_URL + '/add_album', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.reload();
        })
    }


    const handleDelete = (id) => {
        //fetch delete
    }

    useEffect(() => {
    if(props.records){
        setAllRecords(props.records);
    }
    fetch(process.env.REACT_APP_SERVER_URL + '/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        setAllOrders(data);
    })
    }, [props.records]);

    return (
    <div className="admin">
            <div className='page-title'>
                Suivi des commandes
            </div>
            <div className="ordersListContainer">
                <div className='ordersList'>
                    {
                    allOrders.length > 0 ? allOrders.map((order) => {
                        return (<div className='orderItem'>
                        <div>
                            Commande n°{order.orderNumber}
                        </div>
                        <div>
                            ID Client : {order.customerId}
                        </div>
                        <div>
                            Total : {order.total} €
                        </div>
                        {/*
                        <div>
                            {order.items.map((item) => {
                                return (
                                    <div>
                                        {item.quantity} x {item.name}
                                    </div>
                                )
                            })}
                        </div>*/}
                        <div>
                            <select className='orderStatus' onChange={(e) => {setNewStatus(e.target.value)}}>
                                <option value="pending" selected={order.status === 'pending'}>En attente</option>
                                <option value="preparation" selected={order.status === 'preparation'}>En cours de préparation</option>
                                <option value="shipped" selected={order.status === 'shipped'}>Expédié</option>
                            </select>
                        </div>
                        <div className='delBtn' onClick={()=>{handleUpdateOrder(order.orderNumber, newStatus)}}> <IoCheckmarkOutline size={25}/> </div>
                        <div className='delBtn' onClick={()=>{handleDelete(props.record.id)}}> <IoTrashBinOutline size={25}/> </div>
                    </div>)
                    }) : <div className='noOrders'>Aucune commande en cours</div>
                    }
                </div>
            </div>
            <div className='page-title'>
                Gestion des stocks
            </div>
            <div className="productsList">
                {allRecords.map((record) => {
                    return <AdminVinylCard key={record.id} record={record} />
                }
                )}
            </div>
            <div className='page-title'>
                Ajout d'un produit
            </div>
            <div className='add-form form-style'>
                <h1>Album</h1>
                <form>
                    <div className="form-group">
                        <label for="name">Titre de l'album</label>
                        <br/>
                        <input type="text" className="form-control" name="name" placeholder="Titre" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label for="artist">Artiste</label>
                        <br/>
                        <input type="text" className="form-control" name="artist" placeholder="Artiste" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label for="year">Année</label>
                        <br/>
                        <input type="number" min="1900" max="2023" className="form-control" name="year" placeholder="1900" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label for="price">Prix</label>
                        <br/>
                        <input type="number" className="form-control" name="price" placeholder="0" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label for="cover">Image</label>
                        <br/>
                        <input type="text" className="form-control" name="cover" placeholder="Lien de l'image" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label for="stock">Stock</label>
                        <br/>
                        <input type="number" className="form-control" name="stock" placeholder="stock" onChange={(e) => handleChange(e)} />
                    </div>

                    <button type="submit" className="submitButton" onClick={()=>{handleAddAlbum(newProduct)}}>Ajouter</button>
                </form>
            </div>
    </div>
  );
}

export default Admin;
