
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the unified Auth page
    navigate("/login");
  }, [navigate]);

  return <Auth />;
};

export default Login;
