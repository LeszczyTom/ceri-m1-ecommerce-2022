import './admin.css';
import { useState, useEffect } from 'react';
import AdminVinylCard from './AdminVinylCard';
import Orders from '../../orders.json';


function Admin(props) {

  const [allRecords, setAllRecords] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

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

  useEffect(() => {
    if(props.records){
      setAllRecords(props.records);
    }
    setAllOrders(Orders);
  }, [props.records, allRecords, allOrders, Orders]);

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
                        <div>
                            {order.items.map((item) => {
                                return (
                                    <div>
                                        {item.quantity} x {item.name}
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            Statut : {order.status}
                        </div>
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
                        <input type="text" className="form-control" id="name" placeholder="Titre" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="artist">Artiste</label>
                        <br/>
                        <input type="text" className="form-control" id="artist" placeholder="Artiste" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="year">Année</label>
                        <br/>
                        <input type="number" min="1900" max="2022" className="form-control" id="year" placeholder="1900" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="price">Prix</label>
                        <br/>
                        <input type="number" className="form-control" id="price" placeholder="0" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="cover">Image</label>
                        <br/>
                        <input type="text" className="form-control" id="cover" placeholder="Lien de l'image" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="stock">Stock</label>
                        <br/>
                        <input type="number" className="form-control" id="stock" placeholder="stock" onChange={handleChange} />
                    </div>

                    <button type="submit" className="submitButton" onClick={()=>{}}>Ajouter</button>
                </form>
            </div>
    </div>
  );
}

export default Admin;
