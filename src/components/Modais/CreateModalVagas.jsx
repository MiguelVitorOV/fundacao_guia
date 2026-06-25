import { useForm } from "../../hooks/useForm"
import { X } from "lucide-react"

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
    const inputStyle = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800/50 focus:border-blue-800 transition-all text-sm"
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1"

    return (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm items-center justify-center p-4">
            <div className="flex flex-col bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Editar Vaga" : "Nova Vaga"}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">{isEdit ? itemToEdit?.cargo : "Preencha os dados abaixo para cadastrar"}</p>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <form id="vagas-form" onSubmit={handleSubmit} className="flex flex-col max-h-[65vh] overflow-y-auto p-6 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1">
                            <label className={labelStyle}>Cargo</label>
                            <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Ex: Analista de Sistemas" type="text" required className={inputStyle} />
                        </div>
                        <div className="col-span-1">
                            <label className={labelStyle}>Cidade</label>
                            <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Ex: Muriaé - MG" type="text" required className={inputStyle} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="col-span-1">
                            <label className={labelStyle}>Data Início</label>
                            <input name="data_publicacao" value={form.data_publicacao} onChange={handleChange} type="date" required className={inputStyle} />
                        </div>
                        <div className="col-span-1">
                            <label className={labelStyle}>Modalidade</label>
                            <select name="modalidade" value={form.modalidade} onChange={handleChange} required className={inputStyle}>
                                <option value="" disabled>Selecione</option>
                                <option value="PRESENCIAL">Presencial</option>
                                <option value="HOME-OFFICE">Home Office</option>
                                <option value="VAZIO">Nenhuma</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className={labelStyle}>Vínculo</label>
                            <select name="tipo_vinculo" value={form.tipo_vinculo} onChange={handleChange} required className={inputStyle}>
                                <option value="" disabled>Selecione</option>
                                <option value="CLT">CLT</option>
                                <option value="PJ">PJ</option>
                                <option value="ESTAGIO">Estágio</option>
                                <option value="VAZIO">Nenhuma</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1">
                            <label className={labelStyle}>Qtd. Vagas</label>
                            <input name="quantidade" value={form.quantidade} onChange={handleChange} type="number" min={1} required className={inputStyle} />
                        </div>
                        <div className="col-span-1">
                            <label className={labelStyle}>Carga Horária (h)</label>
                            <input name="horas" value={form.horas} onChange={handleChange} type="number" min={1} className={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Principais Atividades (Público alvo)</label>
                        <textarea name="principais_atividades" value={form.principais_atividades} onChange={handleChange} placeholder="Descreva as atividades..." className={`${inputStyle} min-h-[80px]`} />
                    </div>

                    <div>
                        <label className={labelStyle}>Requisitos</label>
                        <textarea name="requisitos" value={form.requisitos} onChange={handleChange} placeholder="Pré-requisitos da vaga..." className={`${inputStyle} min-h-[80px]`} />
                    </div>

                    <div>
                        <label className={labelStyle}>Benefícios</label>
                        <textarea name="beneficios" value={form.beneficios} onChange={handleChange} placeholder="VR, VT, Plano de saúde..." className={`${inputStyle} min-h-[80px]`} />
                    </div>

                    <div>
                        <label className={labelStyle}>Como se Inscrever</label>
                        <input name="como_se_inscrever" value={form.como_se_inscrever} onChange={handleChange} placeholder="Link da gupy ou email..." type="text" className={inputStyle} />
                    </div>
                </form>

                <div className="flex gap-3 p-5 bg-gray-50 border-t border-gray-100 justify-end">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" form="vagas-form" className="px-6 py-2.5 rounded-lg font-bold text-white bg-primary hover:bg-blue-800 transition-colors shadow-sm">
                        {isEdit ? "Salvar Alterações" : "Criar Vaga"}
                    </button>
                </div>
            </div>
        </div>
    )
}