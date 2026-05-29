import { useGetData } from "../hooks/useGetData"
import { useDeleteData } from "../hooks/useDeleteData"
import { usePostData } from "../hooks/usePostData"
import {Pencil, Trash, Plus} from "lucide-react"
import { useState } from "react"
import { DeleteModal } from "./Modais/DeleteModal"
import { PopUp } from "./PopUp"

export function CrudComponent(props) {
    const [item, loading, error, reGetData] = useGetData(props.url)
    const [deleteItem, loadingDelete, errorDelete] = useDeleteData()
    const [createItem, loadingCreate, errorCreate] = usePostData()

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [popup, setPopup] = useState({ isOpen: false, sucesso: "", erro: "" })
    const [selectedItem, setSelectedItem] = useState(null)

    const CreateModal = props.CreateModal

    const handleDeleteItem = () => {
        setDeleteModalOpen(false)
        deleteItem(`${props.deleteUrl}/${selectedItem?.id}`).then(() => {
            setPopup({ isOpen: true, sucesso: "Item deletado com sucesso" })
            reGetData()
        })
        .catch((err) => {
            const msgErro = err.response?.data?.mensagem || "Erro ao deletar item"
            setPopup({ isOpen: true, erro: msgErro })
        })
    }

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false)
        setSelectedItem(null)
    }

    const handleOpenDeleteModal = (item) => {
        setSelectedItem(item)
        setDeleteModalOpen(true)
    }

    const handleCreateItem = (payload) => {
        const body = {...payload}
        createItem(`${props.deleteUrl}`, payload).then(() => {
            setPopup({ isOpen: true, sucesso: "Item criado com sucesso" })
            reGetData()
            setCreateModalOpen(false)
        })
        .catch((err) => {
            const msgErro = err.response?.data?.mensagem || "Erro ao criar item"
            setPopup({ isOpen: true, erro: msgErro })
        })
    }

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true)
    }

    const itemList = item && item.body[props.item].map((item) => {
        return (
            <div key={item.id} className="flex justify-between p-2 m-5 border border-black">
                <p>{item[props.principal]}</p>
                <div className="flex gap-5">
                    <button>
                        <Pencil />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(item)}>
                        <Trash />
                    </button>
                </div>
            </div>
        )
    })
    return (
        <>  
            <div className="flex justify-end">
                <button onClick={handleOpenCreateModal} className="flex gap-2"> <Plus /> Criar Nova</button>
            </div>
            

            <ul>
                {itemList}
            </ul>

            <DeleteModal isOpen={deleteModalOpen} 
            onClose={handleCloseDeleteModal} 
            onConfirm={handleDeleteItem} 
            itemName={selectedItem?.[props.principal]} />

            <CreateModal isOpen={createModalOpen} 
            onClose={handleCloseCreateModal} 
            onConfirm={handleCreateItem} 
            propriedades={props.propriedades} />

            {popup.isOpen && (
                <PopUp 
                    sucesso={popup.sucesso} 
                    erro={popup.erro} 
                    onClose={() => setPopup({ isOpen: false, sucesso: "", erro: "" })} 
                />
            )}
            
            

        </>
    )
}
