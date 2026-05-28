import { useGetData } from "../../hooks/useGetData";
import { BASE_URL } from "../../constants/urls";

export function DashboardPage() {

    const [dataNoticias, loadingNoticias, errorNoticias] = useGetData(`${BASE_URL}/noticias?recentes=900`)
    const [dataEventos, loadingEventos, errorEventos] = useGetData(`${BASE_URL}/eventos`)
    const [dataVagas, loadingVagas, errorVagas] = useGetData(`${BASE_URL}/vagas`)
    const [dataExames, loadingExames, errorExames] = useGetData(`${BASE_URL}/localizacao/overview`)

    const noticiasCount = dataNoticias && dataNoticias.body.noticias.length
    const eventosCount = dataEventos && dataEventos.body.eventos.length
    const vagasCount = dataVagas && dataVagas.body.vagas.length
    let examesCount = 0

    if (dataExames){
        for (const bloco of dataExames.body.blocos) {
            for (const setor of bloco.setores){
                examesCount += setor.exames.length
            }
        }
    }

    return (
        <>
            <h1>Visão Geral</h1>
            <p>Total de Notícias: {noticiasCount}</p>
            <p>Total de Eventos: {eventosCount}</p>
            <p>Total de Vagas: {vagasCount}</p>
            <p>Total de Exames: {examesCount}</p>
        </>
    );
}