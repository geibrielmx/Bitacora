// Función para mostrar el formulario correspondiente
function showForm(formId) {
    document.querySelectorAll('.form-container').forEach(form => form.classList.add('hidden'));
    document.getElementById('form-' + formId).classList.remove('hidden');
}

// Función para obtener los registros almacenados en localStorage
function obtenerRegistros() {
    let registros = localStorage.getItem('registros');
    return registros ? JSON.parse(registros) : [];
}

// Función para guardar los registros en localStorage
function guardarRegistros(registros) {
    localStorage.setItem('registros', JSON.stringify(registros));
}

// Función para dar de alta un nuevo registro
function altaRegistro() {
    const form = document.getElementById('alta-form');

    // Obtener los valores de los campos del formulario
    const nombreSistema = document.getElementById('nombreSistema').value;
    const subsistemaServicio = document.getElementById('subsistemaServicio').value;
    const atencionSeguimiento = document.getElementById('atencionSeguimiento').value;
    const clave = document.getElementById('clave').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const estatusProblema = document.getElementById('estatusProblema').value;
    const nombreProblema = document.getElementById('nombreProblema').value;
    const descripcionBreve = document.getElementById('descripcionBreve').value;
    const detalleProblema = document.getElementById('detalleProblema').value;
    const codigoMensaje = document.getElementById('codigoMensaje').value;
    const solucionProblema = document.getElementById('solucionProblema').value;
    const acciones = document.getElementById('acciones').value;
    const actores = document.getElementById('actores').value;
    const areaSolucionadora = document.getElementById('areaSolucionadora').value;
    const fechaCierre = document.getElementById('fechaCierre').value;

    // Obtener los registros existentes
    const registros = obtenerRegistros();

    // Verificar si la clave ya existe
    if (registros.some(reg => reg.clave === clave)) {
        alert('La clave ya existe. No se pueden duplicar los registros.');
        return;
    }

    // Crear el nuevo registro
    const nuevoRegistro = {
        nombreSistema: nombreSistema,
        subsistemaServicio: subsistemaServicio,
        atencionSeguimiento: atencionSeguimiento,
        clave: clave,
        fechaInicio: fechaInicio,
        estatusProblema: estatusProblema,
        nombreProblema: nombreProblema,
        descripcionBreve: descripcionBreve,
        detalleProblema: detalleProblema,
        codigoMensaje: codigoMensaje,
        solucionProblema: solucionProblema,
        acciones: acciones,
        actores: actores,
        areaSolucionadora: areaSolucionadora,
        fechaCierre: fechaCierre
    };

    // Agregar el nuevo registro a la lista
    registros.push(nuevoRegistro);
    // Guardar los registros actualizados
    guardarRegistros(registros);
    // Limpiar el formulario
    form.reset();
    alert('Registro guardado exitosamente.');
}

// Función para realizar la consulta de registros
function consultaRegistro() {
    const palabraClave = document.getElementById('consulta-clave').value.toLowerCase();
    const registros = obtenerRegistros();
    const resultadoConsulta = document.getElementById('resultado-consulta');
    resultadoConsulta.innerHTML = '';

    let registrosEncontrados = registros.filter(registro =>
        Object.values(registro).some(valor => {
            if (typeof valor === 'string') {
                return valor.toLowerCase().includes(palabraClave);
            }
            return false;
        })
    );

    if (registrosEncontrados.length > 0) {
        let registrosHTML = '';
        registrosEncontrados.forEach(registroEncontrado => {
            registrosHTML += `<div class="registro">
                <p><strong>Nombre del Sistema:</strong> ${resaltarPalabra(registroEncontrado.nombreSistema, palabraClave)}</p>
                <p><strong>Subsistema/Servicio:</strong> ${resaltarPalabra(registroEncontrado.subsistemaServicio, palabraClave)}</p>
                <p><strong>Atención/Seguimiento:</strong> ${resaltarPalabra(registroEncontrado.atencionSeguimiento, palabraClave)}</p>
                <p><strong>Clave:</strong> ${resaltarPalabra(registroEncontrado.clave, palabraClave)}</p>
                <p><strong>Fecha y Hora de Inicio:</strong> ${resaltarPalabra(registroEncontrado.fechaInicio, palabraClave)}</p>
                <p><strong>Estatus del Problema:</strong> ${resaltarPalabra(registroEncontrado.estatusProblema, palabraClave)}</p>
                <p><strong>Nombre del Problema:</strong> ${resaltarPalabra(registroEncontrado.nombreProblema, palabraClave)}</p>
                <p><strong>Descripción Breve del Problema:</strong> ${resaltarPalabra(registroEncontrado.descripcionBreve, palabraClave)}</p>
                <p><strong>Detalle del Problema:</strong> ${resaltarPalabra(registroEncontrado.detalleProblema, palabraClave)}</p>
                <p><strong>Código o Mensaje:</strong> ${resaltarPalabra(registroEncontrado.codigoMensaje, palabraClave)}</p>
                <p><strong>Solución al Problema:</strong> ${resaltarPalabra(registroEncontrado.solucionProblema, palabraClave)}</p>
                <p><strong>Acciones:</strong> ${resaltarPalabra(registroEncontrado.acciones, palabraClave)}</p>
                <p><strong>Actores:</strong> ${resaltarPalabra(registroEncontrado.actores, palabraClave)}</p>
                <p><strong>Área Solucionadora:</strong> ${resaltarPalabra(registroEncontrado.areaSolucionadora, palabraClave)}</p>
                <p><strong>Fecha y Hora de Cierre:</strong> ${resaltarPalabra(registroEncontrado.fechaCierre, palabraClave)}</p>
                <button onclick="editarRegistro('${registroEncontrado.clave}')">Editar</button>
                <button onclick="eliminarRegistro('${registroEncontrado.clave}')">Eliminar</button>
                <hr>
            </div>`;
        });
        resultadoConsulta.innerHTML = registrosHTML;
    } else {
        resultadoConsulta.innerHTML = `<p>No se encontraron registros con la clave "${palabraClave}".</p>
                                        <label><input type="checkbox" disabled> ¿Desea crear un nuevo registro con esta clave?</label>`;
    }
}

// Función para mostrar todos los registros
function mostrarTodosLosRegistros() {
    document.getElementById('consulta-clave').value = '';
    consultaRegistro();
}

// Evento para la búsqueda en tiempo real
document.getElementById('consulta-clave').addEventListener('input', consultaRegistro);

// Evento para la búsqueda al hacer clic en la lupa
document.querySelector('.search-icon').addEventListener('click', mostrarTodosLosRegistros);

// Función para editar un registro
function editarRegistro(clave) {
    const registros = obtenerRegistros();
    const registro = registros.find(reg => reg.clave === clave);

    if (registro) {
        document.getElementById('edicion-nombreSistema').value = registro.nombreSistema;
        document.getElementById('edicion-subsistemaServicio').value = registro.subsistemaServicio;
        document.getElementById('edicion-atencionSeguimiento').value = registro.atencionSeguimiento;
        document.getElementById('edicion-clave').value = registro.clave;
        document.getElementById('edicion-fechaInicio').value = registro.fechaInicio;
        document.getElementById('edicion-estatusProblema').value = registro.estatusProblema;
        document.getElementById('edicion-nombreProblema').value = registro.nombreProblema;
        document.getElementById('edicion-descripcionBreve').value = registro.descripcionBreve;
        document.getElementById('edicion-detalleProblema').value = registro.detalleProblema;
        document.getElementById('edicion-codigoMensaje').value = registro.codigoMensaje;
        document.getElementById('edicion-solucionProblema').value = registro.solucionProblema;
        document.getElementById('edicion-acciones').value = registro.acciones;
        document.getElementById('edicion-actores').value = registro.actores;
        document.getElementById('edicion-areaSolucionadora').value = registro.areaSolucionadora;
        document.getElementById('edicion-fechaCierre').value = registro.fechaCierre;
        showForm('edicion');
    }
}

// Función para actualizar un registro
function actualizarRegistro() {
    const form = document.getElementById('edicion-form');
    const clave = document.getElementById('edicion-clave').value;
    const nombreSistema = document.getElementById('edicion-nombreSistema').value;
    const subsistemaServicio = document.getElementById('edicion-subsistemaServicio').value;
    const atencionSeguimiento = document.getElementById('edicion-atencionSeguimiento').value;
    const fechaInicio = document.getElementById('edicion-fechaInicio').value;
    const estatusProblema = document.getElementById('edicion-estatusProblema').value;
    const nombreProblema = document.getElementById('edicion-nombreProblema').value;
    const descripcionBreve = document.getElementById('edicion-descripcionBreve').value;
    const detalleProblema = document.getElementById('edicion-detalleProblema').value;
    const codigoMensaje = document.getElementById('edicion-codigoMensaje').value;
    const solucionProblema = document.getElementById('edicion-solucionProblema').value;
    const acciones = document.getElementById('edicion-acciones').value;
    const actores = document.getElementById('edicion-actores').value;
    const areaSolucionadora = document.getElementById('edicion-areaSolucionadora').value;
    const fechaCierre = document.getElementById('edicion-fechaCierre').value;

    let registros = obtenerRegistros();
    registros = registros.map(registro => {
        if (registro.clave === clave) {
            registro.nombreSistema = nombreSistema;
            registro.subsistemaServicio = subsistemaServicio;
            registro.atencionSeguimiento = atencionSeguimiento;
            registro.clave = clave;
            registro.fechaInicio = fechaInicio;
            registro.estatusProblema = estatusProblema;
            registro.nombreProblema = nombreProblema;
            registro.descripcionBreve = descripcionBreve;
            registro.detalleProblema = detalleProblema;
            registro.codigoMensaje = codigoMensaje;
            registro.solucionProblema = solucionProblema;
            registro.acciones = acciones;
            registro.actores = actores;
            registro.areaSolucionadora = areaSolucionadora;
            registro.fechaCierre = fechaCierre;
        }
        return registro;
    });

    guardarRegistros(registros);
    alert('Registro actualizado exitosamente.');
    form.reset();
    showForm('consulta');
}

// Función para eliminar un registro
function eliminarRegistro(clave) {
    let registros = obtenerRegistros();
    registros = registros.filter(registro => registro.clave !== clave);
    guardarRegistros(registros);
    consultaRegistro(); // Actualizar la vista de consulta
    alert('Registro eliminado exitosamente.');
}

// Función para limpiar el formulario
function limpiarFormulario(formId) {
    document.getElementById(formId).reset();
}

// Función para limpiar los resultados de la consulta
function limpiarResultadosConsulta() {
    document.getElementById('resultado-consulta').innerHTML = '';
}

// Función para resaltar la palabra buscada
function resaltarPalabra(texto, palabra) {
    if (!palabra || palabra.length === 0) {
        return texto;
    }
    try {
        const regex = new RegExp(palabra, 'gi');
        return texto.replace(regex, '<span class="highlight">$&</span>');
    } catch (e) {
        console.error('Error al crear la expresión regular:', e);
        return texto;
    }
}

// Funciones para generar y guardar el reporte
function generarReporte() {
    const fechaInicio = document.getElementById('reporte-fechaInicio').value;
    const fechaFin = document.getElementById('reporte-fechaFin').value;
    const registros = obtenerRegistros();
    const resultadoReporte = document.getElementById('reporte-resultado');
    resultadoReporte.innerHTML = '';

    let reporteHTML = `<!DOCTYPE html>
                       <html lang="es">
                       <head>
                           <meta charset="UTF-8">
                           <meta name="viewport" content="width=device-width, initial-scale=1.0">
                           <title>Reporte de Bitácora</title>
                           <style>
                               body { font-family: Arial, sans-serif; }
                               .registro { margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; }
                           </style>
                       </head>
                       <body>
                           <h2>Reporte de Bitácora</h2>
                           <p><strong>Fecha de Inicio:</strong> ${fechaInicio}</p>
                           <p><strong>Fecha de Fin:</strong> ${fechaFin}</p><br>`;

    const registrosFiltrados = registros.filter(registro => {
        const fechaRegistro = new Date(registro.fechaInicio).getTime();
        const fechaInicioFiltro = new Date(fechaInicio).getTime();
        const fechaFinFiltro = new Date(fechaFin).getTime();
        return fechaRegistro >= fechaInicioFiltro && fechaRegistro <= fechaFinFiltro;
    });

    if (registrosFiltrados.length === 0) {
        reporteHTML += `<p>No se encontraron registros en el rango de fechas especificado.</p>`;
    } else {
        registrosFiltrados.forEach(registro => {
            reporteHTML += `<div class="registro">
                                <p><strong>Nombre del Sistema:</strong> ${registro.nombreSistema}</p>
                                <p><strong>Subsistema/Servicio:</strong> ${registro.subsistemaServicio}</p>
                                <p><strong>Atención/Seguimiento:</strong> ${registro.atencionSeguimiento}</p>
                                <p><strong>Clave:</strong> ${registro.clave}</p>
                                <p><strong>Fecha y Hora de Inicio:</strong> ${registro.fechaInicio}</p>
                                <p><strong>Estatus del Problema:</strong> ${registro.estatusProblema}</p>
                                <p><strong>Nombre del Problema:</strong> ${registro.nombreProblema}</p>
                                <p><strong>Descripción Breve del Problema:</strong> ${registro.descripcionBreve}</p>
                                <p><strong>Detalle del Problema:</strong> ${registro.detalleProblema}</p>
                                <p><strong>Código o Mensaje:</strong> ${registro.codigoMensaje}</p>
                                <p><strong>Solución al Problema:</strong> ${registro.solucionProblema}</p>
                                <p><strong>Acciones:</strong> ${registro.acciones}</p>
                                <p><strong>Actores:</strong> ${registro.actores}</p>
                                <p><strong>Área Solucionadora:</strong> ${registro.areaSolucionadora}</p>
                                <p><strong>Fecha y Hora de Cierre:</strong> ${registro.fechaCierre}</p><hr>
                            </div>`;
        });
    }

    reporteHTML += `</body></html>`;
    resultadoReporte.innerHTML = reporteHTML;
}

function guardarReporte() {
    const reporteHTML = document.getElementById('reporte-resultado').innerHTML;
    if (!reporteHTML) {
        alert('Primero genere el reporte.');
        return;
    }

    const nombreArchivo = 'reporte_bitacora.html';
    const tipoArchivo = 'text/html';
    const blob = new Blob([reporteHTML], { type: tipoArchivo });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Reporte guardado como archivo HTML.');
}

function limpiarResultadosReporte() {
    document.getElementById('reporte-resultado').innerHTML = '';
}

// Funciones para generar la clave automática
function generarClaveAutomatica() {
    let registros = obtenerRegistros();
    let nuevoNumero = registros.length + 1;
    let clave = "BIE-" + String(nuevoNumero).padStart(3, '0');
    return clave;
}

// Asignar la clave automática al campo "Clave" al cargar el formulario de alta
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('[onclick="showForm(\'alta\')"]').addEventListener('click', function () {
        let claveInput = document.getElementById('clave');
        claveInput.value = generarClaveAutomatica();
    });
});

//Asignar la clave al actualizar el registro
function editarRegistro(clave) {
    const registros = obtenerRegistros();
    const registro = registros.find(reg => reg.clave === clave);

    if (registro) {
        document.getElementById('edicion-nombreSistema').value = registro.nombreSistema;
        document.getElementById('edicion-subsistemaServicio').value = registro.subsistemaServicio;
        document.getElementById('edicion-atencionSeguimiento').value = registro.atencionSeguimiento;
        document.getElementById('edicion-clave').value = registro.clave;
        document.getElementById('edicion-fechaInicio').value = registro.fechaInicio;
        document.getElementById('edicion-estatusProblema').value = registro.estatusProblema;
        document.getElementById('edicion-nombreProblema').value = registro.nombreProblema;
        document.getElementById('edicion-descripcionBreve').value = registro.descripcionBreve;
        document.getElementById('edicion-detalleProblema').value = registro.detalleProblema;
        document.getElementById('edicion-codigoMensaje').value = registro.codigoMensaje;
        document.getElementById('edicion-solucionProblema').value = registro.solucionProblema;
        document.getElementById('edicion-acciones').value = registro.acciones;
        document.getElementById('edicion-actores').value = registro.actores;
        document.getElementById('edicion-areaSolucionadora').value = registro.areaSolucionadora;
        document.getElementById('edicion-fechaCierre').value = registro.fechaCierre;
        showForm('edicion');
    }
}