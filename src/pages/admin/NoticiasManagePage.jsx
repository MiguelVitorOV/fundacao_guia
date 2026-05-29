import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalNoticias } from "../../components/Modais/CreateModalNoticias"

export function NoticiasManagePage() {

    return (
        <>
            <h1>CRUD de Notícias</h1>
            <CrudComponent 
            url="/noticias?recentes=900" 
            deleteUrl="/adminAcao/noticias" 
            item="noticias" 
            principal="titulo" 
            CreateModal={CreateModalNoticias} />

        </>
    )
}
