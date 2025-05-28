
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the unified Auth page
    navigate("/register");
  }, [navigate]);

  return <Auth />;
};

export default Register;
