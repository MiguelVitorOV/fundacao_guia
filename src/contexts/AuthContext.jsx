import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../constants/urls";

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (token){
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            const currentTime = Date.now() / 1000;

            if (currentTime > decodedToken.exp){
                logout()
            }
        }

        if(user && token){
            setUser(JSON.parse(user))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const body = {
                email: email,
                senha: password
            }

            const response = await axios.post(`${BASE_URL}/loginAdmin`, body)
            
            const newUser = {email}

            console.log(response)

            localStorage.setItem('user', JSON.stringify(newUser))
            localStorage.setItem('token', response.data.mensagem.replace('Token Gerado: ', '').trim())
            setUser(newUser)
        } catch (err) {
            setError(err)
            throw err
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
