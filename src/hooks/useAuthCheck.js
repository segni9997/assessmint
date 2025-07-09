// src/hooks/useAuthCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Changed to named import

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        // Ensure the token is a string before decoding
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expired, redirect to login
          console.log("Token expired. Redirecting to /login");
          navigate("/login");
        } else {
    
           navigate("/home-dashboard"); // This line will run if token is valid
        }
      } catch (error) {
        // Handle decoding errors (invalid token format, etc.)
        navigate("/");
      }
    } else {
      console.log("No token found. Redirecting to login");
      navigate("/login");
    }
  }, [navigate]); // Added navigate to dependency array

  // Hooks should return something or null/undefined, or be used for side effects only.
  // Since this hook is primarily for side effects (navigation), it doesn't need to return anything.
};

export default useAuthCheck;