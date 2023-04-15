import { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './formulario.css';
import Checkbox from '../Checkbox';

interface FormularioProps{
    aoCadastrar: Function;
    times: string[];
}

const Formulario = (props:FormularioProps) => {

    const { aoCadastrar, times } = props;

    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [imagem, setImagem] = useState('');
    const [time, setTime] = useState('');
    const [criaTime, setCriaTime] = useState(false);
    const [cor, setCor] = useState('#666666');

    const aoSubmeter = (evento:React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        aoCadastrar(
            nome,
            cargo,
            imagem,
            time,
            cor
        );
        {
            setCriaTime(false);
        }
        setNome('');
        setCargo('');
        setImagem('');
        setTime('');
        setCor('#666666');
    }

    function zeraTime(){
        if(time !== ''){
            setTime('');
            return time;
        }
        return time;
    }

    return (
        <section className="formulario-container">
            <form className="formulario" onSubmit={aoSubmeter}>
                <h2>Preencha os dados para criar o card do colaborador.</h2>
                <CampoTexto
                    obrigatorio={true}
                    label='Nome'
                    placeholder='Digite seu nome '
                    valor={nome}
                    aoAlterado={valor => setNome(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Cargo'
                    placeholder='Digite seu cargo '
                    valor={cargo}
                    aoAlterado={valor => setCargo(valor)} />
                <CampoTexto
                    label='Imagem'
                    placeholder='Informe o endereço da imagem '
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)} />
                <Checkbox
                    label='adicionar time?'
                    valor={criaTime}
                    aoAlterado={valor => setCriaTime(valor)}
                    zeraTime={zeraTime} />
                <ListaSuspensa
                    obrigatorio={true}
                    label='Times'
                    items={times}
                    opcional={criaTime}
                    valor={time}
                    aoAlterado={valor => setTime(valor)} />
                <div className='campo__add-time' style={{display: `${criaTime? 'grid': 'none'}`}}>
                    <CampoTexto
                        label='novo time'
                        placeholder='digite o nome do time:'
                        valor={time}
                        campoMenor = 'campo-texto__menor'
                        aoAlterado={valor => setTime(valor)} />
                    <input className='time___seletor-cor' value={cor} type='color' onChange={e => setCor(e.target.value) }/>
                </div>

                <Botao>Criar card</Botao>
            </form>
        </section>
    )
}

export default Formulario