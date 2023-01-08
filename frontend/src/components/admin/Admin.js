import './admin.css';
import data from '../../data.json';
import { useState, useEffect } from 'react';
import AdminVinylCard from './AdminVinylCard';
import Orders from '../../orders.json';


function Admin(props) {

  const [allRecords, setAllRecords] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

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
    </div>
  );
}

export default Admin;
