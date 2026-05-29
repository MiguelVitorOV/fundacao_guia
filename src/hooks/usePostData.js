import { useState } from "react"
import {api} from "../constants/api"

export const usePostData = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const postData = async (url, body) =>{
        setLoading(true)
        console.log(`Seu body`)
        console.log(body)
        await api.post(url, body).then(() => {
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            setError(err)
            throw err
        })
    }

    return [postData, loading, error]

}