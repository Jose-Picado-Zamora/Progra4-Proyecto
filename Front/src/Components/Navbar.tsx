import { Link } from "@tanstack/react-router";
import { useAuth } from "../Context/AuthContext";
import "../App.css";

const Navbar = () => {
  const darkBlue = "#0A4558"; 
  const { logout, user } = useAuth(); 
  return (
    <nav
      className={`text-white px-6 py-4 flex justify-center items-center shadow-md`}
      style={{ backgroundColor: darkBlue }}
    >
      <Link to="/" className="flex items-center mr-100"> 
        <img src="/logo.png" alt="Fundación logo" className="h-8 w-auto mr-2" />
      </Link>

      <ul className="flex gap-6 text-sm font-medium">
        <li><Link to="/volunteers" className="hover:text-gray-300">Volunteers</Link></li>
        <li><Link to="/projects" className="hover:text-gray-300">Projects</Link></li>
        <li><Link to="/donors" className="hover:text-gray-300">Donors</Link></li>
        <li><Link to="/fairs" className="hover:text-gray-300">Fairs</Link></li>
        <li><Link to="/entrepreneurs" className="hover:text-gray-300">Entrepreneurs</Link></li>
      </ul>

     <div className="ml-auto">
        {user ? (
          <button onClick={logout} className="hover:text-gray-300" >LOG OUT</button>
        ) : (
          <Link to="/" className="hover:text-gray-300">LOG IN</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
