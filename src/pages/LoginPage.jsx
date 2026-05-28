import { useNavigate } from "react-router"

export function LoginPage() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Login</h1>
            <button onClick={() => {navigate("/admin")}}>Realizar Login</button>
        </>
    )
}