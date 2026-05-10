import { Routes, Route } from "react-router-dom";
import Uploadfiles from "./pages/UploadFIle/Uploadfiles";
import VisualizeData from "./pages/Data/VisualizeData";
import Predictions from "./pages/Data/Predictions";
import GoalDashboard from "./pages/Goals/GoalDashboard";
import CreateGoal from "./pages/Goals/CreateGoal";
import EditGoal from "./pages/Goals/EditGoal";

function App() {
  return (
    <Routes>
      <Route path="/Uploadfiles" element={<Uploadfiles />} />
      <Route path="/data" element={<VisualizeData />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/goals" element={<GoalDashboard />} />
      <Route path="/create/goal" element={<CreateGoal />} />
      <Route path="/edit/goal/:goalName" element={<EditGoal />} />
    </Routes>
  );
}

export default App;