import { ReactElement } from 'react'
import './Botao.css'

interface BotaoProps {
    children: ReactElement;
    form: boolean;
    botaoAbrirForm: string;
    evento: React.Dispatch<React.SetStateAction<boolean>>;
}

const Botao = ({children, form, botaoAbrirForm, evento }: BotaoProps) => {

    return <button 
    className={`botao ${botaoAbrirForm? botaoAbrirForm : ''}`}
    onClick={()=> evento? evento(!form): null}
    >
        {children}
    </button>
}

export default Botao