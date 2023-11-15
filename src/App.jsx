import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeederDetail from './pages/FeederDetail';
import MealPlan from './pages/MealPlan';
import FeedRecord from './pages/FeedRecord';
import BehaviorRecord from './pages/BehaviorRecord';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FeederDetail />} />
      <Route path="/mealplan" element={<MealPlan />} />
      <Route path="/records" element={<FeedRecord />} />
      <Route path="/behavior" element={<BehaviorRecord />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
