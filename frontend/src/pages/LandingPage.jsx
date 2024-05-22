import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";

const LandingPage = () => {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      <ButtonComponent onClick={handleClick} loading={loading} text="Buy now" />
    </div>
  );
};

export default LandingPage;
