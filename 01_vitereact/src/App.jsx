import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adarsh from "./adarsh.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Btech 3rd year Student</h1>} />
        <Route path="/adarsh" element={<Adarsh />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;