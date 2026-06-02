import { useGetData } from "../hooks/useGetData"

export function ListaNoticias(props) {

    const [noticias, loading, error] = useGetData(`/noticias?recentes=${props.recentes}`)

    const noticiasList = noticias && noticias.body.noticias.map((noticia) => {
        return <li key={noticia.id}>{noticia.titulo}</li>
    })
    return (
        <ul>
           {noticiasList}
        </ul>
    )
}