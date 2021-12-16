//VARIABLES

const listaGastos = document.querySelector('#gastos ul');
const btnAgregarPresupuesto = document.getElementById('agregar-presupuesto');
const btnAgregarGasto = document.getElementById('agregar-gasto');

let presupuesto = 0;
let presupuestoAnterior = 0;
let gasto = 0;

let gastosLista = [];

btnAgregarPresupuesto.addEventListener('click', agregarPresupuesto);
btnAgregarGasto.addEventListener('click', agregarGasto);

function agregarPresupuesto(e) {
    e.preventDefault();

    presupuesto = parseInt(document.getElementById('presupuesto').value);
    
    if(!presupuesto) {
        mostrarAlerta('Debe ingresar un monto', 'error');
    } else {
        mostrarAlerta('Presupuesto agregado', 'correcto')
        presupuestoAnterior = presupuestoAnterior + presupuesto;
        document.getElementById('total').textContent = presupuestoAnterior;
    }
    formulario.reset();
}

function agregarGasto(e) {
    e.preventDefault();

    const nombreGasto = document.getElementById('gasto').value;
    const cantidad = document.getElementById('cantidad').value;

    const gastoObj = {
        id: Date.now(),
        gasto: nombreGasto,
        importe: cantidad
    }

    if(!nombreGasto || !cantidad) {
        mostrarAlerta('Debes completar todos los campos', 'error');
    } else if (presupuestoAnterior <= gastoObj.importe) {
        mostrarAlerta('No tienes presupuesto suficiente', 'error');
    } else {
        mostrarAlerta('Gasto agregado', 'correcto');
        gastosLista = [...gastosLista, gastoObj];
        crearGasto();
        presupuestoAnterior = presupuestoAnterior - cantidad;
        document.getElementById('total').textContent = presupuestoAnterior;
    }
    formulario.reset();
}

function crearGasto() {
    limpiarHTML();

    gastosLista.forEach( gasto => {
        const gastos = document.createElement('li');
        gastos.textContent = gasto.gasto;
        listaGastos.appendChild(gastos);

        const importeGasto = document.createElement('p');
        importeGasto.textContent = `$${gasto.importe}`;
        gastos.appendChild(importeGasto);

        const btnBorrar = document.createElement('a');
        btnBorrar.textContent = 'X BORRAR';
        btnBorrar.classList.add('btnBorrar');
        gastos.appendChild(btnBorrar);

        btnBorrar.onclick = () => {
            borrarGasto(gasto.id);
        }
    });
}

function borrarGasto(id) {
    const cantidadGasto = gastosLista.find(gasto => gasto.id === id);
    presupuestoAnterior += parseInt(cantidadGasto.importe);
    document.getElementById('total').textContent = presupuestoAnterior;
    gastosLista = gastosLista.filter( gasto => gasto.id !== id);
    crearGasto();
}

function limpiarHTML() {
    while(listaGastos.firstChild) {
        listaGastos.removeChild(listaGastos.firstChild);
    }
}

function mostrarAlerta(mensaje, tipo) {
    const div = document.createElement('div');
    const alerta = document.getElementById('alerta');

    if(tipo === 'error') {
        div.classList.add('bg-danger')
    } else {
        div.classList.add('bg-success')
    }

    alerta.innerHTML = ''
    div.textContent = mensaje;
    div.classList.add('p-2', 'text-white', 'text-center', 'mt-3')
    alerta.appendChild(div);
    setTimeout( () => div.remove(), 3000);
}


