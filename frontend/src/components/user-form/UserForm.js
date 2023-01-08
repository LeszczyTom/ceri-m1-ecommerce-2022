import './userForm.css';
import React, { useState, useEffect } from 'react';
function UserForm() {

    //save login status in local storage
    const [userLogged, setuserLogged] = useState(sessionStorage.getItem('userStatus'));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    useEffect( () => {
        if(sessionStorage.getItem('userStatus') === null) {
            sessionStorage.setItem('userStatus', "false");
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
            console.log(data);
            if(data) {
                setuserLogged("true");
                sessionStorage.setItem('userStatus', "true");
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
    }


    if(userLogged=="false") {
    return (
        <div className="forms-container">

            <div className='register-form form-style'>
                <h1>Nouveau client ?</h1>
                <form>
                    <div className="form-group">
                        <label for="exampleInputLname1">Nom</label>
                        <br/>
                        <input type="test" className="form-control" id="exampleInputLname1" aria-describedby="emailHelp" placeholder="Nom" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputFname1">Prénom</label>
                        <br/>
                        <input type="test" className="form-control" id="exampleInputFname1" aria-describedby="emailHelp" placeholder="Prénom" />
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
                        <input type="test" className="form-control" id="exampleInputAddress1" aria-describedby="emailHelp" placeholder="Adresse" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputCity1">Ville</label>
                        <br/>
                        <input type="test" className="form-control" id="exampleInputCity1" aria-describedby="emailHelp" placeholder="Ville" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputZipcode1">Code postal</label>
                        <br/>
                        <input type="number" className="form-control" id="exampleInputZipcode1" aria-describedby="emailHelp" placeholder="Code postal" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputCountry1">Pays</label>
                        <br/>
                        <input type="test" className="form-control" id="exampleInputCountry1" aria-describedby="emailHelp" placeholder="Pays" />
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
                    <h1>Vous êtes connectés</h1>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail2">E-mail</label>
                            <br/>
                            <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="E-mail" disabled/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword2">Mot de passe</label>
                            <br/>
                            <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Mot de passe" disabled/>
                        </div>
                    </form>
                    <button type="submit" className="submitButton" onClick={handleSignout}>Déconnexion</button>
                </div>
            </div>
        );
    }
}

export default UserForm;