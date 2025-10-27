const fs = require('fs');
const prompt = require('prompt-sync')();

const data = fs.readFileSync('palabras', 'utf-8');
const empleados = data.split("\n").filter(line => line.trim() !== '').map(line => {
    const datas = line.split(",");
    return {
        identificacion: datas[0],
        nombre: datas[1],
        apellido: datas[2],
        departamento: datas[3],
        ventas: datas.slice(4, 13).map(Number),
        comision: datas[7].trim()
    };
});
let listPersonas = [];
function newObj(data) {
    return{
        nombre: data.nombre, 
        apellido: data.apellido,
        identificacion: data.identificacion,
        departamento: data.departamento,
        ventas: data.ventas,
        comision : data.comision
    };
}

empleados.forEach(empleado => {
    let obj = newObj(empleado);
    listPersonas.push(obj);
});

function agregarEmpleado() {
    const nombre = prompt("Ingrese el nombre del empleado: ");
    const identificacion = prompt("Ingrese la identificacion del empleado: ");
    const apellido = prompt("Ingrese el apellido del empleado: ");
    const departamento = prompt("Ingrese el nombre del departamento: ");
    const ventas = [];

    for (let i = 0; i < 9; i++) {
        const mes = [
            'Enero',
            'Febrero', 
            'Marzo',
            'Abril', 
            'Mayo', 
            'Junio', 
            'Julio', 
            'Agosto', 
            'Septiembre'
        ];
        const venta = prompt(`Ingrese las ventas del ${mes[i]}: `);
        ventas.push(Number(venta)); 
    }

    const empleNuevo = {
        identificacion,
        nombre,
        apellido,
        departamento,
        ventas
    };

    if (empleados.find(emple => emple.identificacion === id)) {
        console.log("El empleado ya existe en el sistema");
    } else {
        empleados.push(empleNuevo);
        fs.appendFile('info_empleados.csv',`${identificacion},${nombre},${apellido},${departamento},${ventas.join(",")}\n`, (err) => {
            if (err) {
                console.log("Hay un error al agregar el empleado", err);
            } else {
                console.log("Empleado se agrego correctamente");
            }
        });
    }
}

function eliminarEmpleado() {
    const identificacion = prompt("Ingrese el id del empleado que desea eliminar: ");
    const empleEliminar = empleados.find(empleado => empleado.identificacion === identificacion);

    if (empleEliminar) {
        empleados.splice(empleados.indexOf(empleEliminar), 1);
        fs.writeFileSync('info_empleados.csv', empleados.map(emple => 
        `${emple.identificacion},${emple.nombre},${emple.apellido},${emple.departamento},${emple.ventas.join(",")}`).join("\n"));
        console.log("El empleado eliminado correctamente");
    } else {
        console.log("El empleado registrado no existe en el sistema");
    }
}

function cambiarInformacionEmpleado() {
    const identificacion = prompt("Ingrese el id del empleado que desea cambiar: ");
    const empleadoCambiar = empleados.find(emple => emple.identificacion === identificacion);

    if (empleadoCambiar) {
        console.log("¿Que obcion desea cambiar? Ingrese la opcion: ");
        console.log("1. Identificacion");
        console.log("2. Nombre");
        console.log("3. Apellido");
        console.log("4. Departamento");
        console.log("5. Ventas");

        const opcion = prompt("Ingrese la opcion que desea cambiar: ");

        switch (opcion) {
            case "1":
                const nuevaIdentificacion = prompt("Ingrese la nueva identificacion: ");
                empleadoCambiar.id = nuevaIdentificacion;
                break;
            case "2":
                const nuevoNombre = prompt("Ingrese el nuevo nombre: ");
                empleadoCambiar.nombre = nuevoNombre;
                break;
            case "3":
                const nuevoApellido = prompt("Ingrese el nuevo apellido: ");
                empleadoCambiar.apellido = nuevoApellido;
                break;
            case "4":
                const nuevoDepartamento = prompt("Ingrese el nuevo departamento: ");
                empleadoCambiar.departamento = nuevoDepartamento;
                break;
            case "5":
                const nuevasVentas = [];
                for (let i = 0; i < 9; i++) {
                    const venta = prompt(`Ingrese la nueva venta para el mes ${i + 1}: `);
                    nuevasVentas.push(Number(venta)); 
                }
                empleadoCambiar.ventas = nuevasVentas;
                empleadoCambiar.comision = nuevasVentas[3].toString();
                break;
            default:
                console.log("Opcion no valida, Por favor, intente de nuevo..");
                return;
        }

        fs.writeFileSync('palabras', empleados.map(emp => 
            `${emp.id},${emp.nombre},${emp.apellido},${emp.departamento},${emp.ventas.join(",")}`).join("\n"));
        console.log("La informacion del empleado se ha cambiado correctamente");
    } else {
        console.log("El empleado que desea cambiar no existe en el sistema");
    }
}

function totalVentasporMes() {
    const mes = prompt("Ingrese el mes que desea consultar (1-9): ");
    const ventasPorMes = empleados.reduce((total, empleado) => total + (empleado.ventas[mes - 1] || 0), 0);
    console.log(`El total de ventas del mes ${mes} es: ${ventasPorMes}`);
}

function totalVentasporEmpleado() {
    const identificacion = prompt("Ingrese el id del empleado que desea consultar: ");
    const empleado = empleados.find(empleado => empleado.identificacion === identificacion);
    if (empleado) {
        const totalVentas = empleado.ventas.reduce((total, venta) => total + venta, 0);
        console.log(`El total de las ventas del empleado ${empleado.nombre} es: ${totalVentas}`);
    } else {
        console.log("Lo siento el empleado no existe en el sistema");
    }
}

function totalVentasporDepartamento() {
    const departamentos = [
        "Electronica", 
        "Electrodomesticos", 
        "Muebles"
    ];
    const totalVentas = {};

    departamentos.forEach(departamento => {
        const empleadosDepartamento = empleados.filter(empleado => empleado.departamento === departamento);
        const ventasDepartamento = empleadosDepartamento.reduce((total, empleado) => 
            total + empleado.ventas.reduce((sum, venta) => sum + venta, 0), 0);
        totalVentas[departamento] = ventasDepartamento;
    });

    console.log("El total de ventas por departamento es: ");
    departamentos.forEach(departamento => {
        console.log(`${departamento}: ${totalVentas[departamento]}`);
    });
}

function totalVentasporDepartamentoEspecifico() {
    const departamentos = ["Electronica", "Electrodomesticos", "Muebles"];
    console.log("Seleccione el departamento que desea consultar: ");
    departamentos.forEach((departamento, x) => {
        console.log(`${x + 1}. ${departamento}`);
    });

    const opcion = prompt("Ingrese la opcion que desea consultar: ");
    const departamentoEspecifico = departamentos[opcion - 1];

    if (departamentoEspecifico) {
        const empleadosDepartamento = empleados.filter(empleado => empleado.departamento === departamentoEspecifico);
        const totalVentas = empleadosDepartamento.reduce((total, empleado) => 
            total + empleado.ventas.reduce((sum, venta) => sum + venta, 0), 0);
        console.log(`El total de ventas por departamento ${departamentoEspecifico} es: ${totalVentas}`);
    } else {
        console.log("El Departamento no existe en el sistema");
    }
}

function listadoEmpleados() {
    console.log("Listado de empleados: ");
    empleados.forEach(empleado => {
        console.log(`identificacion: ${empleado.identificacion}, Nombre: ${empleado.nombre} ${empleado.apellido}, Departamento: ${empleado.departamento}, Ventas: ${empleado.ventas.join(", ")}`);
    });
}

function totalVentas() {
    const total = empleados.reduce((total, empleado) => 
        total + empleado.ventas.reduce((sum, venta) => sum + venta, 0), 0);
    console.log(`El total de ventas es: ${total}`);
}

function salirPrograma() {
    console.log("Gracias por usar el programa, esperamos que vuelva pronto");
    process.exit(0);
}
function mostrarMenu() {
    while (true) {
        console.log("\n=== MENU PRINCIPAL ===");
        console.log("1. Agregar empleado");
        console.log("2. Eliminar empleado");
        console.log("3. Modificar empleado");
        console.log("4. Total ventas por mes");
        console.log("5. Total ventas por empleado");
        console.log("6. Total ventas por departamento");
        console.log("7. Total ventas por departamento específico");
        console.log("8. Listado de empleados");
        console.log("9. Total de ventas");
        console.log("10. Salir");
        
        const opcion = prompt("Seleccione una opción: ");
        
        switch (opcion) {
            case "1": agregarEmpleado(); break;
            case "2": eliminarEmpleado(); break;
            case "3": cambiarInformacionEmpleado(); break;
            case "4": totalVentasporMes(); break;
            case "5": totalVentasporEmpleado(); break;
            case "6": totalVentasporDepartamento(); break;
            case "7": totalVentasporDepartamentoEspecifico(); break;
            case "8": listadoEmpleados(); break;
            case "9": totalVentas(); break;
            case "10": salirPrograma(); break;
            default: console.log("Opción no válida");
        }
    }
}
mostrarMenu();