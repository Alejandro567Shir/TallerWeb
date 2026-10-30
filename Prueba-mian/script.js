
// ARREGLO PRINCIPAL
const estudiantes = [];

// OBTENER ELEMENTOS
const formulario = document.getElementById("formulario");
const lista = document.getElementById("listaEstudiantes");
const mensaje = document.getElementById("mensaje");

// AGREGAR ESTUDIANTE
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // OBTENER DATOS
    const nombre = document.getElementById("nombre").value.trim();
    const materia = document.getElementById("materia").value;
    const fecha = document.getElementById("fecha").value;

    // VALIDAR
    if (nombre === "" || materia === "" || fecha === "") {
        mensaje.textContent = "Complete todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    // CREAR ESTUDIANTE
    const estudiante = {
        nombre: nombre,
        materia: materia,
        fecha: fecha,
        estado: "Pendiente"
    };

    // GUARDAR ESTUDIANTE
    estudiantes.push(estudiante);

    mostrarEstudiantes();
    formulario.reset();

    mensaje.textContent = "Estudiante agregado correctamente.";
    mensaje.style.color = "green";
});


// MOSTRAR ESTUDIANTES
function mostrarEstudiantes() {

    lista.innerHTML = "";

    estudiantes.forEach(function(estudiante) {

        // CREAR FILA
        const fila = document.createElement("tr");

        // NOMBRE
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = estudiante.nombre;

        // FECHA
        const celdaFecha = document.createElement("td");
        celdaFecha.textContent = estudiante.fecha;

        // BOTÓN VISTO
        const celdaVisto = document.createElement("td");
        const botonVisto = document.createElement("button");

        botonVisto.textContent = "✓ Visto";
        botonVisto.className = "visto";

        botonVisto.addEventListener("click", function() {
            estudiante.estado = "Completo";
            mostrarEstudiantes();
        });

        celdaVisto.appendChild(botonVisto);

        // BOTÓN BORRAR
        const celdaBorrar = document.createElement("td");
        const botonBorrar = document.createElement("button");

        botonBorrar.textContent = "Borrar";
        botonBorrar.className = "borrar";

        botonBorrar.addEventListener("click", function() {

            const posicion = estudiantes.indexOf(estudiante);
            estudiantes.splice(posicion, 1);

            mostrarEstudiantes();
        });

        celdaBorrar.appendChild(botonBorrar);

        // ESTUDIANTE COMPLETADO
        if (estudiante.estado === "Completo") {
            fila.className = "completado";
            botonVisto.disabled = true;
        }

        // AGREGAR CELDAS
        fila.append(
            celdaNombre,
            celdaFecha,
            celdaVisto,
            celdaBorrar
        );

        lista.appendChild(fila);
    });

    // ACTUALIZAR CONTADORES
    document.getElementById("total").textContent = estudiantes.length;

    document.getElementById("totalPendientes").textContent =
        estudiantes.filter(function(estudiante) {
            return estudiante.estado === "Pendiente";
        }).length;

    document.getElementById("totalCompletos").textContent =
        estudiantes.filter(function(estudiante) {
            return estudiante.estado === "Completo";
        }).length;
}
