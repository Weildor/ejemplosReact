import iconoTerraria from './assets/imgcard/terraria.png';
import iconoKenshi from './assets/imgcard/kenshi.png';
import iconoRimWorld from './assets/imgcard/rimworld.png';
import './Expresiones.css';
function Expresiones(){
    const nombre = 'Porkemon';
    const apellidos = 'Legostrada Castillo';
    return(
        <div>
            
            <Cuerpo/>
            
            
        </div>
    )
}
function Cuerpo(){
    return(
        <div className='cuerpoDiv'>
            <Card1/>
            <Card2/>
            <Card3/>
        </div>
    )
}
function Card1(){
    return(
        <div className="card1Div">
            <lu><img src={iconoTerraria} alt='Terraria'/></lu>
                
                <h2>Terraria</h2>
        </div>
    )
}
function Card2(){
    return(
        <div className="card2Div">
            <lu><img src={iconoKenshi} alt='Kenshi'/></lu>
            
                <h2>Kenshi</h2>
        </div>
    )
}
function Card3(){
    return(
        <div className="card3Div">
            <lu><img src={iconoRimWorld} alt='Rimworld'/></lu>
                
                <h2>RimWorld</h2>
        </div>
    )
}



export default Expresiones