import './userForm.css';
function UserForm() {
    return (
        <div className="forms-container">

            <div className='register-form form-style'>
                <h1>Nouveau client ?</h1>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">E-mail</label>
                        <br/>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Mot de passe</label>
                        <br/>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="submitButton">Créer un compte</button>
                </form>
            </div>

            <div className='login-form form-style'>
                <h1>Déjà client ?</h1>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">E-mail</label>
                        <br/>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Mot de passe</label>
                        <br/>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="submitButton">Je me connecte</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;