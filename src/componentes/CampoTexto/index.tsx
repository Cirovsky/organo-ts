import './campo-texto.css'

interface CampoTextoProps{
    label: string;
    placeholder: string;
    valor: string;
    obrigatorio: boolean;
    campoMenor: string;
    aoAlterado: (valor:string) => void;
}

const CampoTexto = ({label, placeholder, valor, obrigatorio, campoMenor, aoAlterado}:CampoTextoProps) => {
    
    return (<div className={`campo-texto ${campoMenor? campoMenor : ''}`}>
        <label>{label}</label>
        <input value={valor}
            onChange={evento => aoAlterado(evento.target.value)}
            required={obrigatorio}
            placeholder={placeholder} />
    </div>)


}

export default CampoTexto;