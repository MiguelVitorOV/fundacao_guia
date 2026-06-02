import { useGetData } from "../hooks/useGetData"
import { ListaNoticias } from "../components/ListaNoticias"

export function NoticiasPage() {

    const [noticias, loading, error] = useGetData(`/noticias?recentes=900`)

    const noticiasList = noticias && noticias.body.noticias.map((noticia) => {
        return <li key={noticia.id}>{noticia.titulo}</li>
    })
    return (
        <>
            <h1>Notícias</h1>
            <ListaNoticias recentes={900}/>
        </>
    )
}