import iconoKenshi from './assets/imgcard/kenshi.png'
import PropTypes from 'prop-types';
function AcercaDe() {
  return (
    <div className="contenedor-acerca">
       <TarjetaComponent2/>
       <Texto/>
    </div>
  );
}
function TarjetaComponent2(){
    return(
        <div className='card2Div'>
            <img src={iconoKenshi} alt="Kenshi" />
            <h2>Kenshi</h2>
            <p>3D</p>
            <a href="#">Ver mas</a>
        </div>
    )
}
function Texto(){
    return(
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum autem assumenda consequuntur animi tempore explicabo quo quam quasi quibusdam? Ratione quos facilis sapiente commodi, id natus porro non quae iusto!</h3>
    )
}
export default AcercaDe;