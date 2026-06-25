import { useForm } from "../../hooks/useForm"
import { X } from "lucide-react"

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
    const inputStyle = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800/50 focus:border-blue-800 transition-all text-sm"
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1"

    return (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm items-center justify-center p-4">
            <div className="flex flex-col bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Editar Evento" : "Novo Evento"}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">{isEdit ? itemToEdit?.titulo : "Preencha os dados abaixo para cadastrar"}</p>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <form id="eventos-form" onSubmit={handleSubmit} className="flex flex-col max-h-[65vh] overflow-y-auto p-6 gap-5">
                    <div>
                        <label className={labelStyle}>Título do Evento</label>
                        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ex: Mutirão de Doação de Sangue" type="text" required className={inputStyle} />
                    </div>

                    <div>
                        <label className={labelStyle}>Descrição</label>
                        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Detalhes do evento..." className={`${inputStyle} min-h-[100px]`} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1">
                            <label className={labelStyle}>Data de Início</label>
                            <input name="data_inicio" value={form.data_inicio} onChange={handleChange} type="date" required className={inputStyle} />
                        </div>
                        <div className="col-span-1">
                            <label className={labelStyle}>Data de Fim</label>
                            <input name="data_fim" value={form.data_fim} onChange={handleChange} type="date" required className={inputStyle} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1">
                            <label className={labelStyle}>Status</label>
                            <select name="status" value={form.status} onChange={handleChange} required className={inputStyle}>
                                <option value="" disabled>Selecione o status</option>
                                <option value="programado">Programado</option>
                                <option value="em_andamento">Em andamento</option>
                                <option value="concluido">Concluído</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className={labelStyle}>Capacidade de Pessoas</label>
                            <input name="quantidade" value={form.quantidade} onChange={handleChange} placeholder="Qtd. Máxima" type="number" min={1} required className={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Público Alvo</label>
                        <input name="publico_alvo" value={form.publico_alvo} onChange={handleChange} placeholder="Ex: Comunidade em geral" type="text" className={inputStyle} />
                    </div>
                </form>

                <div className="flex gap-3 p-5 bg-gray-50 border-t border-gray-100 justify-end">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" form="eventos-form" className="px-6 py-2.5 rounded-lg font-bold text-white bg-primary hover:bg-blue-800 transition-colors shadow-sm">
                        {isEdit ? "Salvar Alterações" : "Criar Evento"}
                    </button>
                </div>
            </div>
        </div>
    )
}