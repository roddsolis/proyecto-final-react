
const AdminContenido = () => {
    return (
        <>
            <h1>Titulo</h1>
            <p>Desde acá puedes modificar lo que necesites.</p>
            <form action="#" method="post" encType="multipart/form-data">
                <label htmlFor="campo1">Campo 1:</label>
                <br />
                <input type="text" id="campo1" name="campo1" required />
                <br />

                <label htmlFor="campo2">Campo 2:</label>
                <br />
                <input type="text" id="campo2" name="campo2" required />
                <br />

                <label htmlFor="textoGrande">Texto Grande:</label>
                <br />
                <textarea id="textoGrande" name="textoGrande" rows="4" cols="50" required></textarea>
                <br />
                <label htmlFor="archivo">Subir Archivo:</label>
                <br />
                <input type="file" id="archivo" name="archivo" accept=".txt, .pdf, .doc" required />
                <br />
                <button className="adminlogin-button" type="submit">Guardar</button>
            </form>
        </>
    )
}

export default AdminContenido;