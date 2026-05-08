import { Routes, Route } from "react-router-dom";
import Uploadfiles from "./pages/UploadFIle/Uploadfiles";
import VisualizeData from "./pages/Data/VisualizeData";
import Predictions from "./pages/Data/Predictions";
import GoalDashboard from "./pages/Goals/GoalDashboard";
import CreateGoal from "./pages/Goals/CreateGoal";

function App() {
  return (
    <Routes>
      <Route path="/Uploadfiles" element={<Uploadfiles />} />
      <Route path="/data" element={<VisualizeData />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/goals" element={<GoalDashboard />} />
      <Route path="/create/goal" element={<CreateGoal />} />
    </Routes>
  );
}

export default App;