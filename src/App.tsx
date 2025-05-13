import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Ferias from "./Pages/Ferias";
import ProjectsPage from "./Pages/ProjectsPages";
import Donadores from "./Pages/Donadores";
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-6">
        <Routes>
          <Route path="/ferias" element={<Ferias />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/donadores" element={<Donadores />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
