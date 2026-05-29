import { useGetData } from "../hooks/useGetData"

export function LocalizacaoPage() {

    const [localizacao, loading, error] = useGetData(`/localizacao/overview`)

    const localizacaoList = localizacao && localizacao.body.blocos.map((bloco) => {
        return (
            <div key={bloco.id} className="p-5 border border-black w-fit rounded-md mb-5">
                <h1 className="font-extrabold text-xl">{bloco.nome.toUpperCase()}</h1>
                <div className="flex flex-col gap-5 p-5">
                    {bloco.setores.map((setor) => {
                    
                        return (
                            <div key={setor.id} className="border border-black rounded-md w-max p-3">
                                <h2 className="font-bold pb-3 text-center">{setor.nome}</h2>
                                <ul>
                                    {setor.exames.map((exame) => {
                                        return (
                                            <li key={exame.id}>
                                                <p>{exame.nome}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    })

    return (
        <div>
            <h1>Localização</h1>
            {localizacaoList}
        </div>
    )
}