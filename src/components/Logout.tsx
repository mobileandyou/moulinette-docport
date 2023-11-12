import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/");
    }, []);

    return (
        <div>
            Logout
        </div>
    );
}
