import iconoTerraria from './assets/imgcard/terraria.png';
import iconoMinecraft from './assets/imgcard/minecraft.png';
import iconoRimWorld from './assets/imgcard/rimworld.png';
import './Expresiones.css';
function Expresiones(){
    const nombre = 'Porkemon';
    const apellidos = 'Legostrada Castillo';
    return(
        <div>
            <h2>Expresiones</h2>
            <h3>Tu nombre es: {nombre} y tus apellidos son: {apellidos}</h3>
            <Cuerpo/>
            <Lista/>
            
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
                
                <lu>Nombre: Terraria</lu>
        </div>
    )
}
function Card2(){
    return(
        <div className="card2Div">
            <lu><img src={iconoMinecraft} alt='Minecraft'/></lu>
            
                <lu>Nombre: Minecraft</lu>
        </div>
    )
}
function Card3(){
    return(
        <div className="card3Div">
            <lu><img src={iconoRimWorld} alt='Rimworld'/></lu>
                
                <lu>Nombre: RimWorld</lu>
        </div>
    )
}
function Lista(){
    const users = [
        {id: 1, name: 'Eutiquio', role: 'Web Developer'},
        {id: 2, name: 'Dorian', role: 'Web Desingner'},
        {id: 3, name: 'Luis', role:'Team Leader'},
    ]
    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Nombre |</th>
                        <th>Role</th>
                    </tr>
                    <tr>
                    {
                        users.map(function(user, index){
                            return (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                </tr>
                        )
                        })
                    }
                
                 </tr>
                </tbody>
            </table>
        </div>
    )
}


export default Expresiones