
const AdminEstudiantes = () => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Tipo de Cuenta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john.doe@example.com</td>
                        <td>*********</td>
                        <td>Estudiante</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default AdminEstudiantes;