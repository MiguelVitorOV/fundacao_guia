import { Link } from "react-router"
import { ListaNoticias } from "../components/ListaNoticias"

export function HomePage() {
    return (
        <div>
            <section className="flex flex-col px-36 gap-8 my-10 justify-center w-full h-[462px] relative bg-blue-500 z-0 text-white p-5
            before:content-[''] before:absolute before:bg-[url('/fundacao-bg.jpg')] before:z-[-1] before:inset-0 before:bg-cover before:opacity-20">
                <h1 className="text-4xl font-bold font-montserrat-600">Descubra <span className="text-secondary">tudo</span> sobre a FCV</h1>
                <p className="flex flex-wrap w-1/3">Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi.</p>
                <nav className="flex gap-8 ">
                    <Link to="/localizacao">Onde fazer meu exame</Link>
                    <Link to="/vagas">Trabalhe Conosco</Link>
                </nav>
            </section>
            <section className="px-36 bg-neutral-100 py-10">
                <div className="flex justify-between items-center border-b border-neutral-200">
                    <div className="flex flex-col gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-text">Últimas Notícias</h2>
                        <p>Fique atualizado com as últimas notícias e artigos da fundação</p>
                    </div>
                    <Link to="/noticias">
                        Ver todas as noticias
                    </Link>
                </div>
                <div className="my-5">
                    <ListaNoticias recentes={5}/>
                </div>
            </section>
            <section>Seção de serviços</section>
        </div>
    )
}