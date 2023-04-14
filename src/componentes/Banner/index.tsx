import './banner.css'

interface BannerProps{
    enderecoImagem: string;
    textoAlternativo?: string;
}

const Banner = ({enderecoImagem, textoAlternativo}:BannerProps) => {
    return (<section className="cabecalho">
        {/* <img src='/imagens/banner.png' alt='Logo do Organo'/> */}
        <img src={enderecoImagem} alt={textoAlternativo}/>
    </section>)
}

export default Banner;