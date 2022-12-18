import axios from "axios";
import { useNavigate } from "react-router-dom";
import { persistor } from "..";

const logout = (navigate) => {
    axios.get("/api/auth/logout").then(()=>{
        persistor.purge();
        navigate("/login");
    });
}

export { logout };