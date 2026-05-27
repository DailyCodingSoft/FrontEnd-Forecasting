import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Uploadfiles from "./pages/UploadFIle/Uploadfiles";
import VisualizeData from "./pages/Data/VisualizeData";
import Predictions from "./pages/Data/Predictions";
import PredictionHistory from "./pages/Data/PredictionHistory";
import GoalDashboard from "./pages/Goals/GoalDashboard";
import CreateGoal from "./pages/Goals/CreateGoal";
import EditGoal from "./pages/Goals/EditGoal";
import Discount from "./pages/Goals/Discount";

function App() {
  return (
    <Routes>
      {/* Temporary: redirect the base route to the goals dashboard until a dedicated landing page exists. */}
      <Route path="/" element={<Navigate to="/goals" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/Uploadfiles" element={<Uploadfiles />} />
        <Route path="/data" element={<VisualizeData />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/predictions/history" element={<PredictionHistory />} />
        <Route path="/goals" element={<GoalDashboard />} />
        <Route path="/create/goal" element={<CreateGoal />} />
        <Route path="/edit/goal/:goalName" element={<EditGoal />} />
        <Route path="/goals/discount/:goalName" element={<Discount />} />
      </Route>
    </Routes>
  );
}

export default App;