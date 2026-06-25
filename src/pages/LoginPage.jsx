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
        <div className="min-h-screen bg-neutral-100 flex flex-col justify-center items-center px-4">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-800">Acesso Restrito</h1>
                    <p className="text-gray-500 mt-2">Área administrativa da Fundação Guia</p>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                            E-mail
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Digite seu e-mail"
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Digite sua senha"
                            type="password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full mt-2 bg-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/30 transition-all shadow-md"
                    >
                        Entrar
                    </button>
                </form>
            </div>
            
            {popup.isOpen && (
                <PopUp 
                    erro={popup.erro} 
                    onClose={() => setPopup({ isOpen: false, erro: "" })} 
                />
            )}
        </div>
    )
}