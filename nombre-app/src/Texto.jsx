import './texto.css'
function Texto(props) {
    let user = props
    console.info(user)
    if(user.name!=""){
    return (
        <div className="textoDiv">
            <h3>Disfruta tu vida</h3>
            <p>Esta seccion se da a conocer la informacion</p>
        </div>
    )
    }
return (
    <div className="textoDiv"><h3>No hay datos</h3></div>
    )
}
export default Texto