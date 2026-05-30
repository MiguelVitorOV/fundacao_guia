import { useForm } from "../../hooks/useForm"
export const CreateModalEventos = ({ isOpen, onClose, onConfirm, itemToEdit }) => {
    if (!isOpen) return null

    const formatToDate = (timestamp) => {
        if (!timestamp) return ""
        const date = new Date(timestamp)
        return date.toISOString().split("T")[0]
    }

    const [form, handleChange] = useForm({
        titulo: itemToEdit?.titulo || "",
        descricao: itemToEdit?.descricao || "",
        data_inicio: formatToDate(itemToEdit?.data_inicio),
        data_fim: formatToDate(itemToEdit?.data_fim),
        status: itemToEdit?.status || "",
        publico_alvo: itemToEdit?.publico_alvo || "",
        quantidade: itemToEdit?.quantidade || ""
    })

    const handleSubmit = e => {
        e.preventDefault()
        const payload = {
            ...form,
            data_inicio: new Date(form.data_inicio).getTime(),
            data_fim: new Date(form.data_fim).getTime(),
            quantidade: Number(form.quantidade)
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
                <h1>{isEdit ? `Editar notícia ${itemToEdit?.titulo}` : "Criar nova notícia"}</h1>
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-5">
                    <input
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        placeholder="Digite o título da notícia"
                        type="text"
                        required
                    />
                    <textarea
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        placeholder="Digite a descrição da notícia"
                        type="text"
                    />
                    <input
                        name="data_inicio"
                        value={form.data_inicio}
                        onChange={handleChange}
                        placeholder="Digite a data de início"
                        type="date"
                        required
                    />
                    <input
                        name="data_fim"
                        value={form.data_fim}
                        onChange={handleChange}
                        placeholder="Digite a data de fim"
                        type="date"
                        required
                    />
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione o status</option>
                        <option value="programado">Programado</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                    <input
                        name="publico_alvo"
                        value={form.publico_alvo}
                        onChange={handleChange}
                        placeholder="Digite o público alvo"
                        type="text"
                    />
                    <input
                        name="quantidade"
                        value={form.quantidade}
                        onChange={handleChange}
                        placeholder="Digite links adicionais"
                        type="number"
                        min={1}
                        required
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