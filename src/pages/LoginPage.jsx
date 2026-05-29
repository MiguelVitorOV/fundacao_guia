import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { useForm } from "../hooks/useForm"
import { useState } from "react"
import { PopUp } from "../components/PopUp"

export function LoginPage() {
    const [form, handleChange] = useForm({email: '', password: ''})
    const navigate = useNavigate()

    const [popup, setPopup] = useState({ isOpen: false, sucesso: "", erro: "" })
    const { login, user } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log("Logando")
            await login(form.email, form.password)
            navigate("/admin")
        } catch (err) {
            const status = err.response?.status
            const error = err.response?.data?.mensagem || "Erro"
            console.error(error)

            if (status === 401 || status === 404){
                setPopup({ isOpen: true, erro: "Dados incorretos" })
            } else {
                setPopup({ isOpen: true, erro: error })
            }
        }
    }

    useEffect(() => {
        if (user){
            navigate("/admin")
        }
    }, [user])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                    type="email"
                />
                <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    type="password"
                />
                <button type="submit">Entrar</button>
            </form>
            {popup.isOpen && (
                <PopUp 
                    erro={popup.erro} 
                    onClose={() => setPopup({ isOpen: false, erro: "" })} 
                />
            )}
        </div>
    )
}