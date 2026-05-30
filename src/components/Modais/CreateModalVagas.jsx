import { useForm } from "../../hooks/useForm"
export const CreateModalVagas = ({ isOpen, onClose, onConfirm, itemToEdit }) => {
    if (!isOpen) return null

    const formatToDate = (timestamp) => {
        if (!timestamp) return ""
        const date = new Date(Number(timestamp))
        return date.toISOString().split("T")[0]
    }

    const [form, handleChange] = useForm({
        cargo: itemToEdit?.cargo || "",
        cidade: itemToEdit?.cidade || "",
        data_publicacao: formatToDate(itemToEdit?.data_publicacao),
        modalidade: itemToEdit?.modalidade || "",
        tipo_vinculo: itemToEdit?.tipo_vinculo || "",
        principais_atividades: itemToEdit?.principais_atividades || "",
        quantidade: itemToEdit?.quantidade || "",
        horas: itemToEdit?.horas || "",
        beneficios: itemToEdit?.beneficios || "",
        requisitos: itemToEdit?.requisitos || "",
        como_se_inscrever: itemToEdit?.como_se_inscrever || ""
        
    })

    const handleSubmit = e => {
        e.preventDefault()
        const payload = {
            ...form,
            data_publicacao: new Date(form.data_publicacao).getTime(),
            quantidade: Number(form.quantidade),
            horas: String(form.horas)
        }
        if (itemToEdit?.id) {
            payload.id = itemToEdit.id
        }
        onConfirm(payload)
    }

    const isEdit = !!itemToEdit

    return (
        <div className="fixed inset-0 z-50 flex bg-black/50 items-center justify-center">
            <div className="flex flex-col justify-between p-5 bg-white items-center gap-5">
                <h1>{isEdit ? `Editar notícia ${itemToEdit?.cargo}` : "Criar nova notícia"}</h1>
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-5">
                    <input
                        name="cargo"
                        value={form.cargo}
                        onChange={handleChange}
                        placeholder="Digite o nome do cargo"
                        type="text"
                        required
                    />
                    <input
                        name="cidade"
                        value={form.cidade}
                        onChange={handleChange}
                        placeholder="Digite a cidade da vaga"
                        type="text"
                        required
                    />
                    <input
                        name="data_publicacao"
                        value={form.data_publicacao}
                        onChange={handleChange}
                        placeholder="Digite a data de início"
                        type="date"
                        required
                    />
                    <select
                        name="modalidade"
                        value={form.modalidade}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione a modalidade</option>
                        <option value="PRESENCIAL">Presencial</option>
                        <option value="HOME-OFFICE">Home Office</option>
                        <option value="VAZIO">Nenhuma</option>
                    </select>
                    <select
                        name="tipo_vinculo"
                        value={form.tipo_vinculo}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione o vínculo</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="ESTAGIO">Estágio</option>
                        <option value="VAZIO">Nenhuma</option>
                    </select>
                    <textarea
                        name="beneficios"
                        value={form.beneficios}
                        onChange={handleChange}
                        placeholder="Digite os benefícios"
                        type="text"
                    />
                    <textarea
                        name="requisitos"
                        value={form.requisitos}
                        onChange={handleChange}
                        placeholder="Digite os requisitos"
                        type="text"
                    />
                    <textarea
                        name="principais_atividades"
                        value={form.principais_atividades}
                        onChange={handleChange}
                        placeholder="Digite o público alvo"
                        type="text"
                    />
                    <input
                        name="quantidade"
                        value={form.quantidade}
                        onChange={handleChange}
                        placeholder="Digite a quantidade de vagas"
                        type="number"
                        min={1}
                        required
                    />
                    <input
                        name="horas"
                        value={form.horas}
                        onChange={handleChange}
                        placeholder="Digite a quantidade de horas"
                        type="number"
                        min={1}
                    />
                    <input
                        name="como_se_inscrever"
                        value={form.como_se_inscrever}
                        onChange={handleChange}
                        placeholder="Digite como se inscrever (ou link da vaga)"
                        type="text"
                    />

                    <div className="flex gap-5 justify-center">
                        <button type="submit">Confirmar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}