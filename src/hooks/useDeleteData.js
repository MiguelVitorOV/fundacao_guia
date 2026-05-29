import { useEffect, useState } from "react"
import {api} from "../constants/api"

export const useDeleteData = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const deleteData = async (url) =>{
        setLoading(true);
        await api.delete(url).then(() => {
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setLoading(false)
            setError(err)
        })
    }

    return [deleteData, loading, error]

}