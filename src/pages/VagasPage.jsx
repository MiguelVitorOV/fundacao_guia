import { useGetData } from "../hooks/useGetData"
import { BASE_URL } from "../constants/urls"

export function VagasPage() {

    const [vagas, loading, error] = useGetData(`${BASE_URL}/vagas`)

    const vagasList = vagas && vagas.body.vagas.map((vaga) => {
        return <li key={vaga.id}>{vaga.cargo}</li>
    })
    return (
        <>
            <h1>Vagas</h1>
            <ul>
                {vagasList}
            </ul>
        </>
    )
}