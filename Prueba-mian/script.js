
// ARREGLO PRINCIPAL
const estudiantes = [];

const formulario = document.getElementById("formulario");
const lista = document.getElementById("listaEstudiantes");
const mensaje = document.getElementById("mensaje");

let filtro = "Todos";

// AGREGAR ESTUDIANTE
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const materia = document.getElementById("materia").value;
    const fecha = document.getElementById("fecha").value;

    if (nombre === "" || materia === "" || fecha === "") {
        mensaje.textContent = "Complete todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    estudiantes.push({
        nombre: nombre,
        materia: materia,
        fecha: fecha,
        estado: "Pendiente"
    });

    mostrarEstudiantes();
    formulario.reset();

    mensaje.textContent = "Estudiante agregado correctamente.";
    mensaje.style.color = "green";
});


// MOSTRAR ESTUDIANTES
function mostrarEstudiantes() {

    lista.innerHTML = "";

    // OCULTAR TABLA CUANDO NO HAY ESTUDIANTES
    document.querySelector(".tabla-contenedor").style.display =
        estudiantes.length === 0 ? "none" : "block";

    // FILTRAR ESTUDIANTES
    let resultado = estudiantes;

    if (filtro !== "Todos") {
        resultado = estudiantes.filter(function(estudiante) {
            return estudiante.estado === filtro;
        });
    }

    // CREAR FILAS
    resultado.forEach(function(estudiante) {

        const fila = document.createElement("tr");

        const nombre = document.createElement("td");
        nombre.textContent = estudiante.nombre + " - " + estudiante.materia;

        const fecha = document.createElement("td");
        fecha.textContent = estudiante.fecha;

        // BOTÓN VISTO
        const celdaVisto = document.createElement("td");
        const visto = document.createElement("button");

        visto.textContent = "✓ Visto";
        visto.className = "visto";

        visto.addEventListener("click", function() {
            estudiante.estado = "Completo";
            mostrarEstudiantes();
        });

        celdaVisto.appendChild(visto);

        // BOTÓN BORRAR
        const celdaBorrar = document.createElement("td");
        const borrar = document.createElement("button");

        borrar.textContent = "Borrar";
        borrar.className = "borrar";

        borrar.addEventListener("click", function() {
            const posicion = estudiantes.indexOf(estudiante);
            estudiantes.splice(posicion, 1);
            mostrarEstudiantes();
        });

        celdaBorrar.appendChild(borrar);

        // ESTADO COMPLETADO
        if (estudiante.estado === "Completo") {
            fila.className = "completado";
            visto.disabled = true;
        }

        fila.append(nombre, fecha, celdaVisto, celdaBorrar);
        lista.appendChild(fila);
    });

    // ACTUALIZAR CONTADORES
    const completos = estudiantes.filter(function(estudiante) {
        return estudiante.estado === "Completo";
    }).length;

    document.getElementById("total").textContent = estudiantes.length;
    document.getElementById("totalPendientes").textContent =
        estudiantes.length - completos;
    document.getElementById("totalCompletos").textContent = completos;
}


// BOTONES PARA FILTRAR
document.getElementById("todos").addEventListener("click", function() {
    filtro = "Todos";
    mostrarEstudiantes();
});

document.getElementById("pendientes").addEventListener("click", function() {
    filtro = "Pendiente";
    mostrarEstudiantes();
});

document.getElementById("completos").addEventListener("click", function() {
    filtro = "Completo";
    mostrarEstudiantes();
});

// MOSTRAR ESTADO INICIAL
mostrarEstudiantes();
