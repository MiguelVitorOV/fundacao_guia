import { Link } from 'react-router'

export function NavigateButton(props) {
    const baseStyles = "px-4 py-2 rounded-lg transition-all duration-200 font-medium";
  
    const variations = {
    primary: "bg-primary text-white hover:bg-blue-800",
    secondary: "bg-secondary text-white hover:bg-pink-800",
    transparent: "border-2 border-primary text-primary hover:bg-neutral-200",
    white: "bg-white text-primary hover:bg-primary hover:text-white",
    white2: "bg-white text-primary hover:bg-neutral-200"
  };
    const style = `${baseStyles} ${variations[props.variacao] || variations.primary}`;
    
    return (
        <Link to={props.rota}
        className={style}>{props.text}</Link>
    )
}