import axios from "axios";
import { useNavigate } from "react-router-dom";
import { persistor } from "..";

const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.get("/api/auth/logout").then(()=>{
            persistor.purge();
            navigate("/login");
        });
    }

    return (
        <button onClick={logout}>로그아웃</button>
    );
}

export default Logout;