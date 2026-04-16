import { Routes, Route } from "react-router-dom";
import Uploadfiles from "./pages/UploadFIle/Uploadfiles";
import VisualizeData from "./pages/Data/VisualizeData";

function App() {
  return (
    <Routes>
      <Route path="/Uploadfiles" element={<Uploadfiles />} />
      <Route path="/data" element={<VisualizeData />} />
    </Routes>
  );
}

export default App;