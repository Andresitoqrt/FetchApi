//URL DE LA API
const API_URL = "https://retoolapi.dev/0JMRMI/data";
//Funcion que manda a traer el JSON
async function ObtenerPersonas() {
    //Respuesta del servidor
    const res = await fetch(API_URL);//se hace una llamada al endepoint
    
    //Pasamos a JSON la respuesta del servidor
    const data = await res.json();//Esto es un JSON

    //Enviamos el JSON que nos manda la API a ala funcion que crea la tabla HTML
    mostrarDatos(data);
}
// La funcion lleva un parametro "datos" que representa al JSON
function mostrarDatos(datos) {
    //se llama al tbody dentro del elemento con id "tabla"
    const tabla = document.querySelector ('#tabla tbody');
    
    //Para inyecatar codigo HTML usamos innerHTML
    tabla.innerHTML = '';//vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.email}</td>
            <td>${persona.edad}</td>
            <td> 
                <button>Editar</button>
                <button>Eliminar</button>
            </td>

        </tr>
        `
    });
} 

//Lamada inical para que se carguen los datos que vienen del servidor
ObtenerPersonas();

//Agregar un nuevo registro 
const modal = document.getElementById("modal-Agregar");
const btnAgregar = document.getElementById("BtnAbrirModal");
const btnCerrar = document.getElementById("BtnCerrarModal");

btnAgregar.addEventListener("click" , () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
});

document.getElementById("FrmAgregar").addEventListener("submit", async e => {
    e.preventDefault();
    
const Nombre = document.getElementById("Nombre").value.trim();
const Apellido = document.getElementById("Apellido").value.trim();
const email = document.getElementById("email").value.trim();
const edad = document.getElementById("edad").value.trim();

if(!Nombre||!Apellido||!email||!edad){
    alert("Complete todos los campos");
    return;
}

const respuesta = await fetch(API_URL, {
    method:"POST" ,
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({Nombre, Apellido, email, edad})
});

if (respuesta.ok){
    alert("El registro fue agregardo correctamente");

    document.getElementById("FrmAgregar").reset();

    modal.close();

    ObtenerPersonas();
}
else{
    alert("Hubo un error al agrgar");
}

});