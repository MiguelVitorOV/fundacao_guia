import { useGetData } from "../hooks/useGetData"
import { BASE_URL } from "../constants/urls"

export function EventosPage() {

    const [eventos, loading, error] = useGetData(`${BASE_URL}/eventos`)

    const eventosList = eventos && eventos.body.eventos.map((evento) => {
        return <li key={evento.id}>{evento.titulo}</li>
    })
    
    return (
        <>
            <h1>Eventos</h1>
            <ul>
                {eventosList}
            </ul>
        </>
    );
}