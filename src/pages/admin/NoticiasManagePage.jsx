import { CrudComponent } from "../../components/CrudComponent"


export function NoticiasManagePage() {

    return (
        <>
            <h1>CRUD de Notícias</h1>
            <CrudComponent url="/noticias?recentes=900" deleteUrl="/adminAcao/noticias" item="noticias" principal="titulo" />

        </>
    )
}
