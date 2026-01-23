function Expresiones(){
    const nombre = 'Porkemon';
    const apellidos = 'Legostrada Castillo';
    return(
        <div>
            <h2>Expresiones</h2>
            <h3>Tu nombre es: {nombre} y tus apellidos son: {apellidos}</h3>
            <Lista/>
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