import { useForm } from "../../hooks/useForm"
import { X } from "lucide-react"

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
    const inputStyle = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800/50 focus:border-blue-800 transition-all text-sm"
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1"

    return (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm items-center justify-center p-4">
            <div className="flex flex-col bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Editar Exame" : "Novo Exame"}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">{isEdit ? itemToEdit?.nome : "Preencha os dados abaixo para cadastrar"}</p>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <form id="exames-form" onSubmit={handleSubmit} className="flex flex-col max-h-[65vh] overflow-y-auto p-6 gap-5">
                    <div>
                        <label className={labelStyle}>Nome do Exame</label>
                        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Hemograma Completo" type="text" required className={inputStyle} />
                    </div>

                    <div>
                        <label className={labelStyle}>Descrição</label>
                        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Detalhes de preparação..." required className={`${inputStyle} min-h-[100px]`} />
                    </div>

                    <div>
                        <label className={labelStyle}>Localização (Setor/Bloco)</label>
                        <select name="local_id" value={form.local_id} onChange={handleChange} required className={inputStyle}>
                            <option value="" disabled>Selecione o local</option>
                            <option value="loc-001">Laboratório Central</option>
                            <option value="loc-002">Centro de Endocrinologia</option>
                            <option value="loc-003">Laboratório de Urina</option>
                            <option value="loc-006">Laboratório Central (Bloco B)</option>
                            <option value="loc-005">Centro de Endocrinologia (Bloco C)</option>
                        </select>
                    </div>
                </form>

                <div className="flex gap-3 p-5 bg-gray-50 border-t border-gray-100 justify-end">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" form="exames-form" className="px-6 py-2.5 rounded-lg font-bold text-white bg-primary hover:bg-blue-800 transition-colors shadow-sm">
                        {isEdit ? "Salvar Alterações" : "Criar Exame"}
                    </button>
                </div>
            </div>
        </div>
    )
}