import './lista-suspensa.css'

interface ListaSupensaProps {
    label: string;
    items: Array<string>;
    valor: string;
    aoAlterado: (valor: string) => void;
    obrigatorio: boolean;
    opcional: boolean;


}

const ListaSuspensa = (props: ListaSupensaProps) => {

    const { label, items, valor, aoAlterado, obrigatorio, opcional } = props;

    if (!opcional && items.length > 0) {
        return(
        <div className="lista-suspensa">
            <label>{label}</label>
            <select required={obrigatorio} value={valor} onChange={evento => aoAlterado(evento.target.value)}>
                <option />
                {items.map(item => <option key={item}>{item}</option>)}
            </select>
        </div>
        )
    }else{
        return <></>
    }
}

export default ListaSuspensa