import { Routes, Route } from "react-router-dom";
import Uploadfiles from "./pages/UploadFIle/Uploadfiles";

function App() {
  return (
    <Routes>
      <Route path="/Uploadfiles" element={<Uploadfiles />} />
    </Routes>
  );
}

export default App;