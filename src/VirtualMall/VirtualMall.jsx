import React, { useState, useEffect } from "react";
import WalkRoom from "./WalkRoom";
import WalkRoomMobile from "./WalkRoomMobile";

const VirtualMall = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 800);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <WalkRoomMobile /> : <WalkRoom />;
};

export default VirtualMall;

