import { useGetData } from "../hooks/useGetData"
import { useDeleteData } from "../hooks/useDeleteData"
import {Pencil, Trash} from "lucide-react"
import { useState } from "react"
import { DeleteModal } from "./Modais/DeleteModal"


export function CrudComponent(props) {
    const [item, loading, error, reGetData] = useGetData(props.url)
    const [excludeModalOpen, setExcludeModalOpen] = useState(false)
    const [deleteItem, loadingDelete, errorDelete] = useDeleteData()

    const [selectedItem, setSelectedItem] = useState(null)

    const handleDeleteItem = () => {
        setExcludeModalOpen(false)
        deleteItem(`${props.deleteUrl}/${selectedItem?.id}`).then(() => {
            console.log("Item deletado com sucesso")
            reGetData()
        })
    }

    const handleCloseModal = () => {
        setExcludeModalOpen(false)
        setSelectedItem(null)
    }

    const handleOpenModal = (noticia) => {
        setSelectedItem(noticia)
        setExcludeModalOpen(true)
    }

    const itemList = item && item.body[props.item].map((item) => {
        return (
            <div key={item.id} className="flex justify-between p-2 m-5 border border-black">
                <p>{item[props.principal]}</p>
                <div className="flex gap-5">
                    <button>
                        <Pencil />
                    </button>
                    <button onClick={() => handleOpenModal(item)}>
                        <Trash />
                    </button>
                </div>
            </div>
        )
    })
    return (
        <>
            <ul>
                {itemList}
            </ul>

            <DeleteModal isOpen={excludeModalOpen} 
            onClose={handleCloseModal} 
            onConfirm={handleDeleteItem} 
            itemName={selectedItem?.[props.principal]} />

        </>
    )
}
