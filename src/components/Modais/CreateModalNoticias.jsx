export const CreateModalNoticias = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex bg-black/50 items-center justify-center">
            <div className="flex flex-col justify-between p-5 bg-white items-center gap-5">
                <h1>{`Criar nova notícia`}</h1>
                <div className="flex gap-5">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
    

// import { useForm } from "../../hooks/useForm"


// export const CreateModal = ({propriedades, isOpen, onClose, onConfirm, itemName = "item"}) => {
//     if (!isOpen) return null;
    
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