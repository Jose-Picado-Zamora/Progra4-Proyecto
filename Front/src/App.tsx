import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Ferias from "./Pages/FairsPage";
import ProjectsPage from "./Pages/ProjectsPage";
import Donors from "./Pages/DonorsPage";
import VolunteersPage from "./Pages/VolunteersPage";
import EntrepreneursPage from "./Pages/EntrepreneursPage";
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-6">
        <Routes>
          <Route path="/ferias" element={<Ferias />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/volunteers" element={<VolunteersPage/>} />
          <Route path="/entrepreneurs" element={<EntrepreneursPage/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;