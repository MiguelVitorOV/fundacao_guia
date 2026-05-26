import { useEffect, useState } from "react"
import axios from "axios"

export const useGetData = (url) => {
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true);
        axios.get(url).then((res) => {
            setLoading(false)
            setData(res.data)
        })
        .catch((err) => {
            setLoading(false)
            setError(err)
        })
    }, [url])

    return [data, loading, error]

}