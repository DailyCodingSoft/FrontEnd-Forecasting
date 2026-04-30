import { Routes, Route } from "react-router-dom";
import Uploadfiles from "./pages/UploadFIle/Uploadfiles";
import VisualizeData from "./pages/Data/VisualizeData";
import Predictions from "./pages/Data/Predictions";

function App() {
  return (
    <Routes>
      <Route path="/Uploadfiles" element={<Uploadfiles />} />
      <Route path="/data" element={<VisualizeData />} />
      <Route path="/predictions" element={<Predictions />} />
    </Routes>
  );
}

export default App;