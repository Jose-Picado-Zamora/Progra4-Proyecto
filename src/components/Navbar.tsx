import { Link } from "@tanstack/react-router";
import "../App.css";

const Navbar = () => {
  const darkBlue = "#0A4558"; // Tailwind's slate-800 color
  return (
    <nav
      className={`text-white px-6 py-4 flex justify-between items-center shadow-md`}
      style={{ backgroundColor: darkBlue }}
    >
      <Link to="/" className="flex items-center">
        <img src="/logo.png" alt="Fundación logo" className="h-8 w-auto mr-2" />
      </Link>

      <ul className="flex gap-6 text-sm font-medium">
        <li><Link to="/volunteers" className="hover:text-gray-300">Volunteers</Link></li>
        <li><Link to="/projects" className="hover:text-gray-300">Projects</Link></li>
        <li><Link to="/donors" className="hover:text-gray-300">Donors</Link></li>
        <li><Link to="/ferias" className="hover:text-gray-300">Ferias</Link></li>
        <li><Link to="/entrepreneurs" className="hover:text-gray-300">Entrepreneurs</Link></li>
      </ul>

      <div>
        <Link to="/login" className="font-semibold hover:text-gray-300">Login</Link>
      </div>
    </nav>

  );
};

export default Navbar;

