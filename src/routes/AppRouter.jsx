import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateAd from "../pages/CreateAd";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createAd" element={<CreateAd />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;