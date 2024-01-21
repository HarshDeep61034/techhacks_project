import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken !== undefined) {
      navigate("/home");
    } else {
      navigate("/auth");
    }
  }, []);
  return <h1>Hi</h1>;
}

export default App;
