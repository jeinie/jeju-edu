import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.get("/api/auth/logout").then(()=>navigate("/login"));
    }

    return (
        <button onClick={logout}>로그아웃</button>
    );
}

export default Header;