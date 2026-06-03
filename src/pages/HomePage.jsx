import { Link } from "react-router"
import { ListaNoticias } from "../components/ListaNoticias"

export function HomePage() {
    return (
        <div>
            <section className="flex flex-col px-36 gap-8 my-10 justify-center w-full h-[462px] relative bg-blue-500 z-0 text-white p-5
            before:content-[''] before:absolute before:bg-[url('/fundacao-bg.jpg')] before:z-[-1] before:inset-0 before:bg-cover before:opacity-20">
                <h1 className="text-4xl font-bold font-montserrat-600">Descubra <span className="text-secondary">tudo</span> sobre a FCV</h1>
                <p className="flex flex-wrap w-1/3">O portal Fundação Guia centraliza informações essenciais sobre a Fundação Cristiano Varella, facilitando seu acesso a serviços, notícias, vagas e eventos.</p>
                <nav className="flex gap-8 ">
                    <Link to="/localizacao">Onde fazer meu exame</Link>
                    <Link to="/vagas">Trabalhe Conosco</Link>
                </nav>
            </section>
            <section className="px-36 bg-neutral-100 py-10">
                <div className="flex justify-between items-center border-b border-neutral-200">
                    <div className="flex flex-col gap-2 mb-2">
                        <h2 className="text-3xl font-bold text-text">Últimas Notícias</h2>
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
            <section className="px-36 py-10 flex flex-col">
                <div className="flex flex-col gap-2 justify-center pb-2 items-center">
                    <h2 className="text-3xl font-bold text-text">Nossos Serviços</h2>
                    <p>Facilitamos seu acesso às informações da Fundação para garantir que sua jornada seja a mais tranquila possível.</p>
                </div>
                <div className="flex gap-10 justify-center mt-16">
                    <Link to="/localizacao">
                        Buscar local
                    </Link>
                    <Link to="/eventos">
                        Ver Eventos
                    </Link>
                    <Link to="/vagas">
                        Ver oportunidades
                    </Link>
                </div>
            </section>
        </div>
    )
}