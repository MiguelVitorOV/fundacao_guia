import { useGetData } from "../hooks/useGetData"
import { useDeleteData } from "../hooks/useDeleteData"
import { usePostData } from "../hooks/usePostData"
import { usePatchData } from "../hooks/usePatchData"
import { Pencil, Trash, Plus } from "lucide-react"
import { useState } from "react"
import { DeleteModal } from "./Modais/DeleteModal"
import { PopUp } from "./PopUp"

export function CrudComponent(props) {
    const [item, loading, error, reGetData] = useGetData(props.url)
    const [deleteItem, loadingDelete, errorDelete] = useDeleteData()
    const [createItem, loadingCreate, errorCreate] = usePostData()
    const [updateItem, loadingUpdate, errorUpdate] = usePatchData()

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

    const handleConfirmSaveItem = (payload) => {
        if (payload.id) {
            const { id, ...body } = payload
            updateItem(`${props.deleteUrl}/${id}`, body).then(() => {
                setPopup({ isOpen: true, sucesso: "Item atualizado com sucesso" })
                reGetData()
                setCreateModalOpen(false)
            })
                .catch((err) => {
                    const msgErro = err.response?.data?.mensagem || "Erro ao atualizar item"
                    setPopup({ isOpen: true, erro: msgErro })
                })

        } else {
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
    }

    const handleOpenEditModal = (item) => {
        setSelectedItem(item)
        console.log(item)
        setCreateModalOpen(true)
    }

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
        setSelectedItem(null)
    }

    const handleOpenCreateModal = () => {
        setSelectedItem(null)
        setCreateModalOpen(true)
    }

    const itemList = item && item.body[props.item].map((item) => {
        return (
            <div key={item.id} className="flex justify-between items-center p-5 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow group">
                <p className="font-semibold text-gray-900 text-lg">{item[props.principal]}</p>
                <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenEditModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" title="Editar">
                        <Pencil size={20} />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(item)} className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors" title="Excluir">
                        <Trash size={20} />
                    </button>
                </div>
            </div>
        )
    })
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="text-gray-500 text-sm">
                    {item ? `${item.body[props.item].length} registro(s) encontrado(s)` : "Carregando..."}
                </div>
                <button onClick={handleOpenCreateModal} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-sm">
                    <Plus size={20} strokeWidth={2.5} />
                    Criar Novo
                </button>
            </div>


            <div className="flex flex-col gap-4">
                {itemList}
                {(!item || item.body[props.item].length === 0) && !loading && (
                    <div className="bg-white border border-gray-200 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center text-gray-400">
                        <p className="text-lg font-medium text-gray-500">Nenhum registro encontrado.</p>
                        <p className="text-sm mt-1">Clique em "Criar Novo" para adicionar.</p>
                    </div>
                )}
            </div>

            <DeleteModal isOpen={deleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteItem}
                itemName={selectedItem?.[props.principal]} />

            <CreateModal isOpen={createModalOpen}
                onClose={handleCloseCreateModal}
                onConfirm={handleConfirmSaveItem}
                itemToEdit={selectedItem} />

            {popup.isOpen && (
                <PopUp
                    sucesso={popup.sucesso}
                    erro={popup.erro}
                    onClose={() => setPopup({ isOpen: false, sucesso: "", erro: "" })}
                />
            )}
        </div>
    )
}
