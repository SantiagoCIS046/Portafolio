const fs = require('fs'); // Se importa la libreria fs3
const prompt = require('prompt-sync')();// Esta línea de código se utiliza en Node.js para importar y configurar el paquete prompt-sync

// Se lee el archivo de empleados, almacenados en el Array de Objetos
const data = fs.readFileSync('info_empleados.csv', 'utf-8');
const empleados = data.split("\n").map(line => {// El (.split) es un metodo que divide cadenas en un arrray, también se utiliza (.map) para convertir cada línea en un objeto
    const fields = line.split(",");// Se le llama a la constante (fields) dodnde se almacenan los datos de cada empleado dandos por el (.split)
    return {
        id: fields[0],
        nombre: fields[1],
        apellido: fields[2],
        departamento: fields[3],
        ventas: fields.slice(4, 13).map(Number),// El (4,13) se utilza para que tome los campos de la 4 a la columna 13, el (.map(Number)) se utiliza para convertir los datos a numeros
        comision: fields[7].trim()// El (.trim()) se utiliza para eliminar los espacios en blanco
    };
});
let listEmpleados = [];
  
function newObj(data) { //Se crea un nuevo objeto con los datos del empleado
    return {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        departamento: data.departamento,
        ventas: data.ventas,
        comision: data.comision
    };
}

empleados.forEach(emp => { // (forEach) ejecuta cada elemento del array, (emp) representa cada elemento del array Empleados
    let obj = newObj(emp);// Se crea un nuevo objeto donde se llama a la funcion newObj
    listEmpleados.push(obj);// Se agrega el objeto a la lista
});

function agregarEmpleado() { //Se crea la funcion para agregar un nuevo empleado
    const nombre = prompt("Ingrese el nombre del empleado: ");
    const id = prompt("Ingrese el id del empleado: ");
    const departamento = prompt("Ingrese el nombre del departamento: ");
    const ventas = [];

    for (let i = 0; i < 9; i++) { // Se inicia desde el mes de Enero (0), hasta el mes de Septiembre(9)
        const mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'];
        const venta = prompt(`Ingrese las ventas del ${mes[i]}: `); // Se muestra el nombre del mes
        ventas.push(Number(venta)); // Se agrega la venta al array con (.push) donde se convierte a numero con (.Number)
    }

    const empleadoNuevo = { // Se crea un nuevo empleado
        nombre,
        id,
        departamento,
        ventas
    };

    //Se valida si el empleado ya existe en el sistema
    if (empleados.find(empleado => empleado.id === id)) { //Se utiliza (.find) para encontrar el empleado, El (empleado.id === id) se utiliza para comparar el id del empleado y el id ingresado
        console.log("El empleado ya existe en el sistema");
    } else {
        empleados.push(empleadoNuevo);// Se agrega el empleado al array utilizando (.push)
        fs.appendFile('info_empleados.csv', `${nombre},${id},${departamento},${ventas.join(",")}\n`, (err) => { // fs.appendFile se utiliza para agregar una nueva liena al archivo
            if (err) { // Si se encuentra un (err)-> error
                console.log("Error al agregar el empleado", err);
            } else { // Si fue agragado con exito
                console.log("Empleado agregado correctamente");
            }
        });
    }
}

function eliminarEmpleado() { // Se crea una funcion para Elminar un empleado
    const id = prompt("Ingrese el id del empleado que desea eliminar: ");
    const empleadoEliminar = empleados.find(empleado => empleado.id === id);// se utiliza (.find) para encontrar el empleadon que se desea eliminar

    if (empleadoEliminar) {
        empleados.splice(empleados.indexOf(empleadoEliminar), 1); // Se utiliza (.splice) para eliminar el empleado en especifico, luego se usa (.indexOf) para encontrar la posicion del empleado
        fs.writeFileSync('info_empleados.csv', empleados.map(emp => `${emp.nombre},${emp.id},${emp.departamento},${emp.ventas.join(",")}`).join("\n"));// writeFileSync se utiliza para sobrescribir en el archivo
        console.log("Empleado eliminado correctamente");
    } else {
        console.log("El empleado no existe en el sistema");
    }
}

function cambiarInformacionEmpleado() { // Se crea funcion para cambiar la informacion de un empleado
    const id = prompt("Ingrese el id del empleado que desea cambiar: ");
    const empleadoCambiar = empleados.find(empleado => empleado.id === id); // Se utiliza (.find) para encontrar el empleado al cual se desea cambiar el id

    if (empleadoCambiar) {
        console.log("Seleccione la opcion que desea cambiar: ");
        console.log("1. ID");
        console.log("2. Nombre");
        console.log("3. Departamento");
        console.log("4. Ventas");

        const opcion = prompt("Ingrese la opcion que desea cambiar: ");

        switch (opcion) { // Se utiliza (switch) para elegir la opcion
            case "1":
                const nuevoId = prompt("Ingrese el nuevo id: ");
                empleadoCambiar.id = nuevoId;
                break;
            case "2":
                const nuevoNombre = prompt("Ingrese el nuevo nombre: ");
                empleadoCambiar.nombre = nuevoNombre;
                break;
            case "3":
                const nuevoDepartamento = prompt("Ingrese el nuevo departamento: ");
                empleadoCambiar.departamento = nuevoDepartamento;
                break;
            case "4":
                const nuevasVentas = [];// Se crea array de ventas
                for (let i = 0; i < 9; i++) { // SE solicita las nuevas ventas atraves de un for
                    const venta = prompt(`Ingrese la nueva venta para el mes ${i + 1}: `);
                    nuevasVentas.push(Number(venta)); // Se agrega la nueva venta al array
                }
                empleadoCambiar.ventas = nuevasVentas;
                break;
            default: // En caso que la opcion no sea valida
                console.log("Opcion no valida, Por favor, intente de nuevo..");
                break;
        }
        // Se utiliza (.map) para crear un nuevo array con la informacion del empleado, donde tambien se valida los datos del empleado
        fs.writeFileSync('info_empleados.csv', empleados.map(emp => `${emp.nombre},${emp.id},${emp.departamento},${emp.ventas.join(",")}`).join("\n"));
        console.log("Informacion del empleado modificada correctamente");
    } else {
        console.log("El empleado no existe en el sistema");
    }
}

function totalVentasporMes() { // Se crea una funcion para calcular el total de ventas por mes
    const mes = prompt("Ingrese el mes que desea consultar (1-9): ");

    // Se utiliza (.reduce) para calcular el total de ventas por mes, luego se utiliza (empleado.ventas[mes-1] || 0) para validar si el mes es valido, dado caso que sea 0 se utiliza (0)
    const ventasPorMes = empleados.reduce((total, empleado) => total + (empleado.ventas[mes - 1] || 0), 0); 
    console.log(`El total de ventas del mes ${mes} es: ${ventasPorMes}`);
}

function totalVentasporEmpleado() { // Se crea una funcion para calcular el total de ventas por empleado
    const id = prompt("Ingrese el id del empleado que desea consultar: ");
    const empleado = empleados.find(empleado => empleado.id === id);// Se utiliza (.find) para encontrar el empleado con el id ingresado
    if (empleado) {
        const totalVentas = empleado.ventas.reduce((total, venta) => total + venta, 0);// Se utiliza (.reduce) para calcular el total de ventas del empleado
        console.log(`El total de ventas del empleado ${empleado.nombre} es: ${totalVentas}`);
    } else {
        console.log("El empleado no existe en el sistema");
    }
}

function totalVentasporDepartamento() { // Se crea una funcion para calcular el total de ventas por departamento
    const departamentos = ["Electronica", "Electrodomesticos", "Muebles"];
    const totalVentas = {};

    departamentos.forEach(departamento => { // Se usa (.forEach) para recorrer cada uno de los departamentos
        const empleadosDepartamento = empleados.filter(empleado => empleado.departamento === departamento);// Se utiliza (.filter) para encontrar los empleados del departamento

        // Se utiliza (.reduce) para calcular el total de ventas por departamento, luego se utiliza (empleado.ventas.reduce((total, venta) => total + venta, 0)) para calcular el total de ventas por departamento
        const ventasDepartamento = empleadosDepartamento.reduce((total, empleado) => total + empleado.ventas.reduce((total, venta) => total + venta, 0), 0);
        totalVentas[departamento] = ventasDepartamento;
    });

    console.log("El total de ventas por departamento es: ");
    departamentos.forEach(departamento => { // Se usa (.forEach) para recorrer cada uno de los departamentos
        console.log(`${departamento}: ${totalVentas[departamento]}`);// Se imprime el total de ventas por departamento
    });
}

function totalVentasporDepartamentoEspecifico() { // Se crea una funcion para calcular el total de ventas por departamento especifico
    const departamentos = ["Electronica", "Electrodomesticos", "Muebles"];
    console.log("Seleccione el departamento que desea consultar: ");
    departamentos.forEach((departamento, index) => { // Se usa (.forEach) para recorrer cada uno de los departamentos
        console.log(`${index + 1}. ${departamento}`);// Se imprime el departamento con su respectivo numero 
    });

    const opcion = prompt("Ingrese la opcion que desea consultar: ");
    const departamentoEspecifico = departamentos[opcion - 1]; 

    if (departamentoEspecifico) {
        const empleadosDepartamento = empleados.filter(empleado => empleado.departamento === departamentoEspecifico); // Se utiliza (.filter) para encontrar los empleados del departamento

        //Se utiliza (.reduce) para calcular el total de ventas por departamento , luego se calcula el total de ventas por departamento
        const totalVentas = empleadosDepartamento.reduce((total, empleado) => total + empleado.ventas.reduce((total, venta) => total + venta, 0), 0);
        console.log(`El total de ventas del departamento ${departamentoEspecifico} es: ${totalVentas}`);
    } else {
        console.log("El Departamento no existe en el sistema. Por favor, intente de nuevo..");
    }
}

function listadoEmpleados() { // Se crea una funcion para mostrar el listado de empleados
    console.log("Listado de empleados: ");
    empleados.forEach(empleado => { // Se usa (.forEach) para recorrer cada uno de los empleados 
        console.log(`ID: ${empleado.id}, Nombre: ${empleado.nombre}, Departamento: ${empleado.departamento}, Ventas: ${empleado.ventas.join(", ")}`);
    });
}

function totalVentas() { // Se crea una funcion para calcular el total de ventas

    // Se utiliza (.reduce) para calcular el total de ventas
    const total = empleados.reduce((total, empleado) => total + empleado.ventas.reduce((total, venta) => total + venta, 0), 0);
    console.log(`El total de ventas es: ${total}`);
}

function salirPrograma() { // Se crea una funcion para salir del programa
    console.log("Gracias por usar el programa, vuelva pronto..");
    process.exit(0); // Se utiliza (process.exit) para salir del programa
}

function menu() { // Se crea una funcion para mostrar el menu del programa
    while (true) { 
        console.log("\nSeleccione una opción:");
        console.log("1. Agregar empleado");
        console.log("2. Eliminar empleado");
        console.log("3. Cambiar información de empleado");
        console.log("4. Total de ventas por mes");
        console.log("5. Total de ventas por empleado");
        console.log("6. Total de ventas por departamento");
        console.log("7. Total de ventas por departamento específico");
        console.log("8. Listado de empleados");
        console.log("9. Total de ventas");
        console.log("0. Salir");

        // Se crea una constante donde pueda mostrar la opcion que el usuario seleccione 
        const opcion = prompt("Ingrese su opción: ");

        switch (opcion) {
            case "1":
                agregarEmpleado();
                break;
            case "2":
                eliminarEmpleado();
                break;
            case "3":
                cambiarInformacionEmpleado();
                break;
            case "4":
                totalVentasporMes();
                break;
            case "5":
                totalVentasporEmpleado();
                break;
            case "6":
                totalVentasporDepartamento();
                break;
            case "7":
                totalVentasporDepartamentoEspecifico();
                break;
            case "8":
                listadoEmpleados();
                break;
            case "9":
                totalVentas();
                break;
            case "0":
                salirPrograma();
                break;
            default: // En caaso que la opcion no sea ninguna de las anteriores se imprime.. 
                console.log("Opción no válida, por favor intente de nuevo.");
        }
    }
}
// se llama a la funcion menu para que se ejecute el programa 
menu();
