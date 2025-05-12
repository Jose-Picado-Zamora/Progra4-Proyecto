import { Link } from "@tanstack/react-router";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Fundación</div>

      <ul className="flex gap-6 text-sm font-medium">
        <li><Link to="/voluntarios" className="hover:text-gray-300">Voluntarios</Link></li>
        <li><Link to="/projects" className="hover:text-gray-300">Projects</Link></li>
        <li><Link to="/donadores" className="hover:text-gray-300">Donadores</Link></li>
        <li><Link to="/ferias" className="hover:text-gray-300">Ferias</Link></li>
        <li><Link to="/emprendedores" className="hover:text-gray-300">Emprendedores</Link></li>
      </ul>

      <div>
        <Link to="/login" className="font-semibold hover:text-gray-300">Login</Link>
      </div>
    </nav>

  );
};

export default Navbar;

