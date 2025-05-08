import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Ferias from "./pages/Ferias";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-6">
        <Routes>
          <Route path="/ferias" element={<Ferias />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
