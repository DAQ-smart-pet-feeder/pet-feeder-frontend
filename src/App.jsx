import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeederDetail from './pages/FeederDetail';
import MealPlan from './pages/MealPlan';
import FeedRecord from './pages/FeedRecord';
import BehaviorRecord from './pages/BehaviorRecord';
import RoomDataGraphs from "./components/datagraphs/RoomDataGraphs";
import TankDataGraphs from "./components/datagraphs/TankDataGraphs";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FeederDetail />} />
      <Route path="/mealplan" element={<MealPlan />} />
      <Route path="/records" element={<FeedRecord />} />
      <Route path="/behavior" element={<BehaviorRecord />} />
      <Route path="/room-data" element={<RoomDataGraphs />} />
      <Route path="/tank-data" element={<TankDataGraphs />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
