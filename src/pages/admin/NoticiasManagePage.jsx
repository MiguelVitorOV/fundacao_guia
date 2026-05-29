import { useGetData } from "../../hooks/useGetData"
import { useDeleteData } from "../../hooks/useDeleteData"
import {Pencil, Trash} from "lucide-react"
import { useState } from "react"
import { DeleteModal } from "../../components/Modais/DeleteModal"


export function NoticiasManagePage() {
    const [noticias, loading, error] = useGetData(`/noticias?recentes=900`)
    const [excludeModalOpen, setExcludeModalOpen] = useState(false)
    const [deleteNoticia, loadingDelete, errorDelete] = useDeleteData()

    const [selectedItem, setSelectedItem] = useState(null)

        const noticiasList = noticias && noticias.body.noticias.map((noticia) => {
            return (
                <div key={noticia.id} className="flex justify-between p-2 m-5 border border-black">
                    <p>{noticia.titulo}</p>
                    <div className="flex gap-5">
                        <button>
                            <Pencil />
                        </button>
                        <button onClick={() => {
                            setSelectedItem(noticia)
                            setExcludeModalOpen(true)
                        }}>
                            <Trash />
                        </button>
                    </div>
                </div>
            )
        })
        return (
            <>
                <h1>CRUD de Notícias</h1>
                <ul>
                    {noticiasList}
                </ul>

                <DeleteModal isOpen={excludeModalOpen} 
                onClose={() => setExcludeModalOpen(false)} 
                onConfirm={() => {
                    setExcludeModalOpen(false);
                    deleteNoticia(`/adminAcao/noticias/${selectedItem?.id}`)
                }} 
                itemName={selectedItem?.titulo} />

            </>
        )
}
