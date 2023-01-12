import './userForm.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Navigate, redirect, useNavigate } from "react-router-dom";

function UserForm() {

    //save login status in local storage
    const [userLogged, setuserLogged] = useState(sessionStorage.getItem('userStatus'));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');


    const [ordersUser, setOrdersUser] = useState([]);
    const [userId, serUserId] = useState('');

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect( () => {
        if(sessionStorage.getItem('userStatus') === null) {
            sessionStorage.setItem('userStatus', "false");
        }

        if(cookies.get('role') && cookies.get('role') !== 'admin') {
            fetch(process.env.REACT_APP_SERVER_URL + '/orders' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                setOrdersUser(data)
            })
        }

    },[]);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                pwd: password
            })
        }).then(response => response.json())
        .then(data => {
            console.log("login=", data);
            if(data) {
                setuserLogged("true");
                sessionStorage.setItem('userStatus', "true");
                cookies.set('role', JSON.stringify(data), { path: '/' });
                cookies.set('role', data, { path: '/' });
                if(data === 'admin') {
                    navigate('/backoffice')
                } else {
                    navigate('/user-form')
                }
            }
            else {
                alert("Email ou mot de passe incorrect");
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                pwd: password
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data) {
                setuserLogged("true");
                sessionStorage.setItem('userStatus', "true");
                cookies.set('role', data, { path: '/' });
            }
            else {
                alert("Identifiants incorrects ou déjà utilisés");
            }
        })
    }

    const handleSignout = (e) => {
        e.preventDefault();
        setuserLogged("false");
        sessionStorage.setItem('userStatus', "false");
        cookies.remove('role', { path: '/' });
        navigate("/user-form");
    }


    if(userLogged==="false") {
    return (
        <div className="forms-container">

            <div className='register-form form-style'>
                <h1>Nouveau client ?</h1>
                <form>
                    <div className="form-group">
                        <label for="exampleInputLname1">Nom</label>
                        <br/>
                        <input type="text" className="form-control" id="exampleInputLname1" aria-describedby="emailHelp" placeholder="Nom" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputFname1">Prénom</label>
                        <br/>
                        <input type="text" className="form-control" id="exampleInputFname1" aria-describedby="emailHelp" placeholder="Prénom" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1">E-mail*</label>
                        <br/>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" value={emailReg} onChange={e => setEmailReg(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Mot de passe*</label>
                        <br/>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Mot de passe" required value={passwordReg} onChange={e => setPasswordReg(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputAddress1">Adresse</label>
                        <br/>
                        <input type="text" className="form-control" id="exampleInputAddress1" aria-describedby="emailHelp" placeholder="Adresse" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputCity1">Ville</label>
                        <br/>
                        <input type="text" className="form-control" id="exampleInputCity1" aria-describedby="emailHelp" placeholder="Ville" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputZipcode1">Code postal</label>
                        <br/>
                        <input type="number" className="form-control" id="exampleInputZipcode1" aria-describedby="emailHelp" placeholder="Code postal" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputCountry1">Pays</label>
                        <br/>
                        <input type="text" className="form-control" id="exampleInputCountry1" aria-describedby="emailHelp" placeholder="Pays" />
                    </div>

                    <button type="submit" className="submitButton" onClick={handleRegister}>Créer un compte</button>
                </form>
            </div>

            <div className='login-form form-style'>
                <h1>Déjà client ?</h1>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail3">E-mail</label>
                        <br/>
                        <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword3">Mot de passe</label>
                        <br/>
                        <input type="password" className="form-control" id="exampleInputPassword3" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="submitButton" onClick={handleLogin}>Je me connecte</button>
                </form>
            </div>
        </div>
    );    
    }
    else {
        return (
            <div className="profile-container">
                <div className='login-form form-style'>

                    <h1>Bienvenue sur PinkZebra</h1>
                    
                    <div className='page-title'>
                        Mes commandes
                    </div>
                    
                    <div className="ordersListContainer">
                        <div className='ordersList'>
                            {
                            ordersUser.length > 0 ? ordersUser.map((order) => {
                                return (<div className='orderItem'>
                                <div>
                                    Commande n°{order.orderNumber}
                                </div>
                                <div>
                                    Total : {order.total} €
                                </div>
                                <div>
                                    Statut : {order.status}
                                </div>
                            </div>)
                            }) : <div className='noOrders'>Aucune commande en cours</div>
                            }
                        </div>
                    </div>     
                    
                    <button type="submit" className="submitButton" onClick={()=>{navigate("/")}}>Boutique</button>
                    <button type="submit" className="submitButton" onClick={()=>{navigate("/cart")}}>Panier</button>
                    <button type="submit" className="submitButton" onClick={handleSignout}>Déconnexion</button>
                </div>
            </div>
        );
    }
}

export default UserForm;