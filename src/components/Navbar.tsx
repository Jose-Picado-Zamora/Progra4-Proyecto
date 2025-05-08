import { Link } from "react-router-dom";
import "../App.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>Fundación</div>

      <ul>
        <li><Link to="/voluntarios">Voluntarios</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
        <li><Link to="/donadores">Donadores</Link></li>
        <li><Link to="/ferias">Ferias</Link></li>
        <li><Link to="/emprendedores">Emprendedores</Link></li>
      </ul>

      <div>
        <Link to="/login" style={{ fontWeight: "600" }}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
