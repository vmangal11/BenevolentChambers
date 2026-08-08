// App.js

import "./App.css";
import HomePage from "./benevolent.jsx";
import ContactForm from "./Contact.jsx";
import BlogPage from "./Blogs.jsx";
import ResetPassword from "./ResetPassword.jsx";
import DisclaimerPopup from "./DisclaimerPopup.jsx"; // ✅ IMPORT ADDED

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"; 

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      
      {/* ✅ ADD DISCLAIMER HERE (Outside of Routes so it acts as an overlay) */}
      <DisclaimerPopup /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;