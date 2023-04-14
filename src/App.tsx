import { useState } from "react";

import Banner from "componentes/Banner";
import Formulario from "componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import Botao from "./componentes/Botao";

import {v4 as uuidv4} from 'uuid';
import {BiAddToQueue} from 'react-icons/bi'

import './App.css';

function App() {

  const timesInicial = localStorage.times != null? 
    JSON.parse(localStorage.getItem('times')) : [];
  const [times, setTimes] = useState(timesInicial);

  function addNovoTime(novoTime){
    const novaListaTimes = [...times, novoTime ];
    setTimes(novaListaTimes);
    localStorage.setItem('times', JSON.stringify(novaListaTimes));
  }

  function mudarCorTime (cor, id){
    setTimes(times.map( time =>{
      if(time.id === id){
        time.cor = cor;
      }
      return time;
    }))
    localStorage.setItem('times', JSON.stringify(times));
  }

  const  inicial = localStorage.colaboradores != null? 
    JSON.parse(localStorage.getItem('colaboradores')) : [];

  const [colaboradores, setColaboradores] = useState(inicial)

  console.log(colaboradores)
  const [form, setForm] = useState(false)



  const aoCadastrar = (nome,cargo, imagem, time, cor) =>{
    const colaborador = {nome, cargo, imagem, time, cor};
    console.log(colaborador);
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

  const deletarColaborador = (colaborador) =>{
    const copiaColaboradores = [...colaboradores];
    const index = copiaColaboradores.indexOf(colaborador);
    copiaColaboradores.splice(index, 1);
    console.log(index, colaborador.nome)
    setColaboradores(copiaColaboradores);
    localStorage.setItem('colaboradores', JSON.stringify(copiaColaboradores));
  }

  return (
    <div>
      <Banner enderecoImagem="/imagens/banner.png" textoAlternativo="Logo do Organo" />
      <section style={{display: `${form? 'block': 'none'}`}}>
      <Formulario 
        times={times.length > 0 && times.map(time => time.nome)} 
        addNovoTime={addNovoTime} 
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
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.id)} />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
