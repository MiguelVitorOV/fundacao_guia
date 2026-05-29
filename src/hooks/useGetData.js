import { useEffect, useState } from "react"
import { api } from "../constants/api"

export const useGetData = (url) => {
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const getData = async () => {
        setLoading(true)
        api.get(url).then((res) => {
            setLoading(false)
            setData(res.data)
        })
            .catch((err) => {
                setLoading(false)
                setError(err)
            })
    }

    useEffect(() => {
        getData()
    }, [url])

    return [data, loading, error, getData]

}