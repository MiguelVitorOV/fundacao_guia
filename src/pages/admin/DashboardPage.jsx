import { useGetData } from "../../hooks/useGetData"

export function DashboardPage() {

    const [dataNoticias, loadingNoticias, errorNoticias] = useGetData(`/noticias?recentes=900`)
    const [dataEventos, loadingEventos, errorEventos] = useGetData(`/eventos`)
    const [dataVagas, loadingVagas, errorVagas] = useGetData(`/vagas`)
    const [dataExames, loadingExames, errorExames] = useGetData(`/localizacao/overview`)

    const noticiasCount = dataNoticias && dataNoticias.body.noticias.length
    const eventosCount = dataEventos && dataEventos.body.eventos.length
    const vagasCount = dataVagas && dataVagas.body.vagas.length
    let examesCount = 0

    if (dataExames) {
        for (const bloco of dataExames.body.blocos) {
            for (const setor of bloco.setores) {
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
    )
}