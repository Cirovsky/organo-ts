import { IColaborador } from 'compartilhado/interfaces/iColaborador';
import Colaborador from '../Colaborador';
import './time.css';
import hexToRgba from 'hex-to-rgba';
import { ITime } from 'compartilhado/interfaces/ITime';

interface TimeProps{
    time: ITime;
    colaboradores: Array<IColaborador>;
    deletarColaborador: Function;
    mudarCor:Function;

}

const Time = (props:TimeProps) => {
    const { time, colaboradores, deletarColaborador, mudarCor } = props;
    return (
        colaboradores.length > 0 &&
        <section className='time'
            style={{
                backgroundImage: 'url(/imagens/fundo.png)',
                backgroundColor: hexToRgba(time.cor, 0.6)
            }}
        >
            <input value={time.cor} type='color' className='input-cor' onChange={(e) => mudarCor(e.target.value, time.id)} />
            <h3 style={{ borderColor: time.cor }}>{time.nome}</h3>
            <div className='colaboradores'>
                {colaboradores.map((colaborador, indice) => {
                    return <Colaborador
                        key={indice}
                        colaborador={colaborador}
                        cor={time.cor}
                        deletarColaborador={deletarColaborador} />;
                })}
            </div>
        </section>

    )
}

export default Time