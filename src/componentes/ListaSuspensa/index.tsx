import './lista-suspensa.css'

interface ListaSupensaProps {
    label: string;
    items: Array<string>;
    valor: string;
    aoAlterado: Function;
    obrigatorio: boolean;
    opcional: Boolean;


}

const ListaSuspensa = (props:ListaSupensaProps) => {

    const {label, items,  valor, aoAlterado, obrigatorio, opcional} = props;

    return !opcional&& items.length > 0 &&(<div className="lista-suspensa">
        <label>{label}</label>
        <select required={obrigatorio} value={valor} onChange={evento => aoAlterado(evento.target.value)}>
            <option />
            {items.map(item => <option key={item}>{item}</option>)}
        </select>
    </div>)
}

export default ListaSuspensa