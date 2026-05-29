import { useForm } from "../../hooks/useForm"
export const CreateModalNoticias = ({isOpen, onClose, onConfirm, itemToEdit}) => {
    if (!isOpen) return null

    const formatToDate = (timestamp) => {
        if(!timestamp) return ""
        const date = new Date(Number(timestamp))
        return date.toISOString().split("T")[0]
    }
    
    const [form, handleChange] = useForm({
        noticia_id_fundacao: itemToEdit?.noticia_id_fundacao || "",
        titulo: itemToEdit?.titulo || "",
        resumo: itemToEdit?.resumo || "",
        conteudo: itemToEdit?.conteudo || "",
        data_publicacao: formatToDate(itemToEdit?.data_publicacao),
        tags: itemToEdit?.tags || "",
        imagens: itemToEdit?.imagens || "",
        outros_links: itemToEdit?.outros_links || ""
    })

    const handleSubmit = e => {
        e.preventDefault()
        const payload = {
            ...form,
            noticia_id_fundacao: String(form.noticia_id_fundacao),
            data_publicacao: new Date(form.data_publicacao).getTime(),
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
                <h1>{isEdit? `Editar notícia ${itemToEdit?.titulo}` : "Criar nova notícia"}</h1>
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-5">
                    <input 
                    name="noticia_id_fundacao"
                    value={form.noticia_id_fundacao}
                    onChange={handleChange}
                    placeholder="Digite o id da notícia no site da fundação"
                    type="number"
                    min={1}
                    required
                    />
                    <input 
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Digite o título da notícia"
                    type="text"
                    required
                    />
                    <textarea 
                    name="resumo"
                    value={form.resumo}
                    onChange={handleChange}
                    placeholder="Digite o resumo da notícia"
                    type="text"
                    />
                    <textarea 
                    name="conteudo"
                    value={form.conteudo}
                    onChange={handleChange}
                    placeholder="Digite o conteúdo da notícia"
                    required
                    />
                    <input 
                    name="data_publicacao"
                    value={form.data_publicacao}
                    onChange={handleChange}
                    placeholder="Digite a data de publicação"
                    type="date"
                    required
                    />
                    <input 
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="Digite as tags"
                    type="text"
                    />
                    <input 
                    name="imagens"
                    value={form.imagens}
                    onChange={handleChange}
                    placeholder="Digite a URL da imagem"
                    type="text"
                    />
                    <input 
                    name="outros_links"
                    value={form.outros_links}
                    onChange={handleChange}
                    placeholder="Digite links adicionais"
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
    

// import { useForm } from "../../hooks/useForm"


// export const CreateModal = ({propriedades, isOpen, onClose, onConfirm, itemName = "item"}) => {
//     if (!isOpen) return null
    
//     const [form, handleChange] = useForm({propriedades})


//     return (
//         <div className="fixed inset-0 z-50 flex bg-black/50 items-center justify-center">
//             <div className="flex flex-col justify-between p-5 bg-white items-center gap-5">
//                 <h1>{`Criar novo ${itemName}`}</h1>
//                 <div className="flex gap-5">
//                     <button onClick={onConfirm}>Confirmar</button>
//                     <button onClick={onClose}>Cancelar</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// // const [form, handleChange] = useForm({email: '', password: ''})
// //     const navigate = useNavigate()
// //     const { login, user } = useAuth()

// //     const handleSubmit = async (e) => {
// //         e.preventDefault()

// //         try {
// //             console.log("Logando")
// //             await login(form.email, form.password)
// //             navigate("/admin")
// //         } catch (err) {
// //             const status = err.response?.status
// //             const error = err.response?.data?.mensagem || "Erro genérico"
// //             console.error(error)

// //             if (status === 401 || status === 404){
// //                 alert("Email ou senha incorretos")
// //             }
// //         }
// //     }