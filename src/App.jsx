import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./components/sections/Servicios";
import ServiceDetail from "./pages/ServiceDetail";

import "./styles/global.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header className="absolute top-0 z-50" />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            {/* Servicios Routes */}
            <Route path="/servicios">
              <Route index element={<Servicios />} />
              <Route path=":slug" element={<ServiceDetail />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
