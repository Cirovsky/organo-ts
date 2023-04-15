import { IColaborador } from 'compartilhado/interfaces/IColaborador';
import Colaborador from 'componentes/Colaborador';
import './time.css';
import hexToRgba from 'hex-to-rgba';
import { ITime } from 'compartilhado/interfaces/ITime';

interface TimeProps{
    time: ITime;
    colaboradores: Array<IColaborador>;
    deletarColaborador: (arg0: IColaborador) => void;
    mudarCor:(arg0: string, arg1: string) => ITime | void;

}

const Time = (props:TimeProps) => {
    const { time, colaboradores, deletarColaborador, mudarCor } = props;

    if(colaboradores.length > 0){
        return (
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
    }else{
        return <></>;
    }

    
}

export default Time