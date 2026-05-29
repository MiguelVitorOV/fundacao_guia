import { useGetData } from "../hooks/useGetData"

export function VagasPage() {

    const [vagas, loading, error] = useGetData(`/vagas`)

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