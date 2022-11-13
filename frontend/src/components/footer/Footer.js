import './footer.css';

const Footer = (props) => {
  return (
    <footer className="footer">
        <div className="footer-container">
        <div className="row">
            <div className="footer-col">
                <h4>Plan du site</h4>
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Boutique</a></li>
                    <li><a href="#">Profil</a></li>
                    <li><a href="#">Panier</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>Stack technique</h4>
                <ul>
                    <li><a href="https://fr.reactjs.org/">Front-end : ReactJS</a></li>
                    <li><a href="https://fastapi.tiangolo.com/">Back-end : FastAPI</a></li>
                    <li><a href="https://cloud.google.com/?hl=fr">Hosting : Google Cloud</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>Groupe</h4>
                <ul>
                    <li><a href="#">Atmani Yasser</a></li>
                    <li><a href="#">El Hajoui Mohamed</a></li>
                    <li><a href="#">Leszczynski Tom</a></li>
                </ul>
            </div>
            <div className="footer-col footer-col-social">
                <h4>Projet</h4>
                <div className="social-links">
                    <a href="#"><i className="fab fa-github"></i></a>
                    <a href="#"><i className="fab fa-slack"></i></a>
                </div>
            </div>
        </div>
        </div>
    </footer>
  );
}

export default Footer;