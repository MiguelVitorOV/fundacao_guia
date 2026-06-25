import { useForm } from "../../hooks/useForm"
export const CreateModalExames = ({ isOpen, onClose, onConfirm, itemToEdit }) => {
    if (!isOpen) return null


    const [form, handleChange] = useForm({
        nome: itemToEdit?.nome || "",
        descricao: itemToEdit?.descricao || "",
        local_id: itemToEdit?.local_id || "",
    })

    const handleSubmit = e => {
        e.preventDefault()
        const payload = {
            ...form
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
                <h1>{isEdit ? `Editar notícia ${itemToEdit?.nome}` : "Criar nova notícia"}</h1>
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-5">
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do exame"
                        type="text"
                        required
                    />
                    <textarea
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        placeholder="Digite a descrição do exame"
                        type="text"
                        required
                    />
                    <select
                        name="local_id"
                        value={form.local_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione o local do exame</option>
                        <option value="loc-001">Laboratório Central</option>
                        <option value="loc-002">Centro de Endocrinologia</option>
                        <option value="loc-003">Laboratório de Urina</option>
                        <option value="loc-006">Laboratório Central</option>
                        <option value="loc-005">Centro de Endocrinologia</option>
                    </select>

                    <div className="flex gap-5 justify-center">
                        <button type="submit">Confirmar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}