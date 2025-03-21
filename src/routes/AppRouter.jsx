import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateAd from "../pages/CreateAd";
import AdDetails from "../pages/AdDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createAd" element={<CreateAd />} />
        <Route path="/ad/:id" element={<AdDetails />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;