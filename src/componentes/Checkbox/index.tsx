import './Checkbox.css'

interface CheckBoxProps{
    label: string;
    valor: boolean;
    aoAlterado: (valor: boolean) => void;
    zeraTime: (arg0: void) => string;
}


const Checkbox = ({ label, valor, aoAlterado, zeraTime }:CheckBoxProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                type='checkbox'
                checked = {valor}
                onChange={ () => {
                    zeraTime();
                    aoAlterado(!valor);
                }}
            />
        </>

    );
}

export default Checkbox;