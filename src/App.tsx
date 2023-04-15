import { useState } from "react";

import Banner from "componentes/Banner";
import Formulario from "componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import Botao from "./componentes/Botao";

import { ITime } from "compartilhado/interfaces/ITime";

import {v4 as uuidv4} from 'uuid';
import {BiAddToQueue} from 'react-icons/bi'

import './App.css';
import { IColaborador } from "compartilhado/interfaces/IColaborador";

function App() {

  const timesInicial: Array<ITime> = localStorage.times != null? 
    JSON.parse(localStorage.getItem('times')|| "") : [];
    
  const [times, setTimes] = useState(timesInicial);

  function addNovoTime(novoTime:ITime){
    const novaListaTimes = [...times, novoTime ];
    setTimes(novaListaTimes);
    localStorage.setItem('times', JSON.stringify(novaListaTimes));
  }

  function mudarCorTime (cor:string, id:string){
    setTimes(times.map( time =>{
      if(time.id === id){
        time.cor = cor;
      }
      return time;
    }))
    localStorage.setItem('times', JSON.stringify(times));
  }

  const  inicial:Array<IColaborador> = localStorage.colaboradores != null? 
    JSON.parse(localStorage.getItem('colaboradores') || "") : [];

  const [colaboradores, setColaboradores] = useState(inicial)
  const [form, setForm] = useState(false)



  const aoCadastrar = (nome:string,cargo:string, imagem:string, time:string, cor:string, id='') =>{
    const colaborador = {nome, cargo, imagem, time, cor,id};
      colaborador.id = uuidv4();
      if(times.map(time => time.nome).indexOf(colaborador.time) === -1){
        const novoTime = {
          id: uuidv4(),
          nome: colaborador.time,
          cor: cor,
    
        };
        addNovoTime(novoTime);
        colaborador.time = novoTime.id;
      }else{
        colaborador.time = times.filter(time => time.nome === colaborador.time)[0].id;
      }
      setColaboradores([...colaboradores, colaborador]);
      localStorage.setItem('colaboradores', JSON.stringify([...colaboradores, colaborador]));
  }

  const deletarColaborador = (colaborador:IColaborador) =>{
    const copiaColaboradores = [...colaboradores];
    const index = copiaColaboradores.indexOf(colaborador);
    copiaColaboradores.splice(index, 1);
    setColaboradores(copiaColaboradores);
    localStorage.setItem('colaboradores', JSON.stringify(copiaColaboradores));
  }

  return (
    <div>
      <Banner enderecoImagem="/imagens/banner.png" textoAlternativo="Logo do Organo" />
      <section style={{display: `${form? 'block': 'none'}`}}>
      <Formulario 
        times={times.length > 0? times.map(time => time.nome): []}
        aoCadastrar={aoCadastrar} />
      </section>
      <div className="container container__abrir-formulario">
      <Botao botaoAbrirForm={'botao-abrir-formulario'} form = {form} evento={setForm}><BiAddToQueue/></Botao>
      </div>
      <section className="times">
        <h1>Minha organização</h1>
        {times.length > 0 && times.map((time, indice) => <Time 
          key={indice} 
          time={time}
          deletarColaborador={deletarColaborador}
          mudarCor={mudarCorTime}
          colaboradores={colaboradores.filter((colaborador:IColaborador) => colaborador.time === time.id)} />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
