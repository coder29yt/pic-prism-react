import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SellerDashboard from "../pages/SellerDashboard";
import BuyerDashboard from "../pages/BuyerDashboard";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";

const GsapTransition = () => {
  const nodeRef = useRef(null);
  const location = useLocation();
  console.log("The location is : ", location);

  //   Jab bhi location change hoga tab ye use effect run hoga, because ye useEffect hook ko ham depenedent banane wale hai locaiton ke upper

  //   When a page renders, useEffects runs first
  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [location]);
  //   When we keep dependecny array empy it means that : bhai ye page call hoga jab bhi tum refresh karoge

  //   For GSAP :
  //  1) target
  //  2) logic

  return (
    <div ref={nodeRef}>
      <Toaster />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/seller/profile" element={<SellerDashboard />} />
        <Route path="/buyer/profile" element={<BuyerDashboard />} />
      </Routes>
    </div>
  );
};

export default GsapTransition;
