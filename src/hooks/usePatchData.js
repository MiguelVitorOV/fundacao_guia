import { useState } from "react"
import {api} from "../constants/api"

export const usePatchData = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const patchData = async (url, body) =>{
        setLoading(true)
        console.log(`Seu body`)
        console.log(body)
        await api.patch(url, body).then(() => {
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            setError(err)
            throw err
        })
    }

    return [patchData, loading, error]

}