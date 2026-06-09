import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function InfoCard({ titulo, descricao, linkTexto, rota }) {
  return (
    <div className="bg-neutral-100 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-md flex flex-col gap-3 w-full max-w-sm">
      <h3 className="text-xl font-bold text-text">{titulo}</h3>
      <p className="text-neutral-500 flex-grow">{descricao}</p>
      <Link 
        to={rota} 
        className="text-primary font-semibold hover:text-secondary transition-colors duration-200 mt-2 w-fit flex items-center gap-1 group"
      >
        {linkTexto} 
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
