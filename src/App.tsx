import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Ferias from "./pages/Ferias";
import Donadores from "./pages/Donadores";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-6">
        <Routes>
          <Route path="/ferias" element={<Ferias />} />
        </Routes>
        <Routes>
          <Route path="/donadores" element={<Donadores />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
