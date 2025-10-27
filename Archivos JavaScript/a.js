const fs = require('fs');
const prompt = require('prompt-sync')();

// Se lee el archivo de empleados, almacenados en el Array de Objetos
let empleados = [];
let listEmpleados = [];

try {
    const data = fs.readFileSync('info_empleados.csv', 'utf-8');
    empleados = data.split("\n").filter(line => line.trim() !== '');
    console.log("Datos cargados:", empleados);
} catch (err) {
    console.log("Error al leer el archivo, creando uno nuevo...");
    fs.writeFileSync('info_empleados.csv', '');
}

function newObj(data) {
    const parts = data.split(",");
    if (parts.length < 8) {
        console.log("Datos incompletos:", data);
        return null;
    }
    
    let obj = {
        id: parts[0],
        nombre: parts[1],
        apellido: parts[2],
        departamento: parts[3],
        mes: parts[4],
        ventas: parts[5],
        monto: parts[6],
        comision: parts[7].trim()
    };
    return obj;
}

empleados.forEach(empleado => {
    const data = empleado.trim();
    let obj = newObj(data);
    if (obj) {
        listEmpleados.push(obj);
    }
});

// Se agrega un nuevo empleado al sistema
function agregarEmpleado() {
    const nombre = prompt("Ingrese el nombre del empleado: ");
    const apellido = prompt("Ingrese el apellido del empleado: ");
    const id = prompt("Ingrese el id del empleado: ");
    const departamento = prompt("Ingrese el nombre del departamento: ");
    const ventas = [];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'];
    
    for (let i = 0; i < meses.length; i++) {
        const venta = prompt(`Ingrese las ventas de ${meses[i]}: `);
        const monto = prompt(`Ingrese el monto de ventas de ${meses[i]}: `);
        const comision = prompt(`Ingrese la comisión de ${meses[i]}: `);
        
        ventas.push({
            mes: meses[i],
            ventas: venta,
            monto: monto,
            comision: comision
        });
    }

    const empleadoNuevo = {
        id,
        nombre,
        apellido,
        departamento,
        ventas
    };

    if (listEmpleados.find(emp => emp.id === id)) {
        console.log("El empleado ya existe en el sistema");
    } else {
        listEmpleados.push(empleadoNuevo);

        // Preparar datos para CSV
        let csvLines = [];
        ventas.forEach(v => {
            csvLines.push(`${id},${nombre},${apellido},${departamento},${v.mes},${v.ventas},${v.monto},${v.comision}`);
        });

        fs.appendFileSync('info_empleados.csv', csvLines.join("\n") + "\n");
        console.log("Empleado agregado correctamente");
    }
}

// Se elimina el Empleado con el id ingresado
function eliminarEmpleado() {
    const id = prompt("Ingrese el id del empleado que desea eliminar: ");
    const empleadoEliminar = listEmpleados.find(empleado => empleado.id === id);

    if (empleadoEliminar) {
        listEmpleados = listEmpleados.filter(emp => emp.id !== id);
        
        // Reconstruir archivo CSV
        let csvData = [];
        listEmpleados.forEach(emp => {
            emp.ventas.forEach(v => {
                csvData.push(`${emp.id},${emp.nombre},${emp.apellido},${emp.departamento},${v.mes},${v.ventas},${v.monto},${v.comision}`);
            });
        });
        
        fs.writeFileSync('info_empleados.csv', csvData.join("\n"));
        console.log("Empleado eliminado correctamente");
    } else {
        console.log("El empleado no existe en el sistema");
    }
}

// Se modifica la información de un empleado
function cambiarInformacionEmpleado() {
    const id = prompt("Ingrese el id del empleado que desea modificar: ");
    const empleadoCambiar = listEmpleados.find(empleado => empleado.id === id);

    if (empleadoCambiar) {
        console.log("Seleccione la opción que desea cambiar: ");
        console.log("1. ID");
        console.log("2. Nombre");
        console.log("3. Apellido");
        console.log("4. Departamento");
        console.log("5. Ventas de un mes específico");

        const opcion = prompt("Ingrese la opción que desea cambiar: ");

        switch (opcion) {
            case "1":
                const nuevoId = prompt("Ingrese el nuevo id: ");
                empleadoCambiar.id = nuevoId;
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
                const mes = prompt("Ingrese el mes que desea modificar (Enero-Septiembre): ");
                const ventaIndex = empleadoCambiar.ventas.findIndex(v => v.mes === mes);
                if (ventaIndex !== -1) {
                    const nuevasVentas = prompt(`Ingrese las nuevas ventas para ${mes}: `);
                    const nuevoMonto = prompt(`Ingrese el nuevo monto para ${mes}: `);
                    const nuevaComision = prompt(`Ingrese la nueva comisión para ${mes}: `);
                    empleadoCambiar.ventas[ventaIndex] = {
                        mes,
                        ventas: nuevasVentas,
                        monto: nuevoMonto,
                        comision: nuevaComision
                    };
                } else {
                    console.log("Mes no encontrado");
                }
                break;
            default:
                console.log("Opción no válida, Por favor, intente de nuevo..");
                break;
        }

        // Actualizar archivo CSV
        let csvData = [];
        listEmpleados.forEach(emp => {
            emp.ventas.forEach(v => {
                csvData.push(`${emp.id},${emp.nombre},${emp.apellido},${emp.departamento},${v.mes},${v.ventas},${v.monto},${v.comision}`);
            });
        });
        
        fs.writeFileSync('info_empleados.csv', csvData.join("\n"));
        console.log("Información del empleado modificada correctamente");
    } else {
        console.log("El empleado no existe en el sistema");
    }   
}

// Se calcula el total de ventas por mes
function totalVentasPorMes() {
    const mes = prompt("Ingrese el mes que desea consultar (Enero-Septiembre): ");
    let total = 0;

    listEmpleados.forEach(empleado => {
        const ventaMes = empleado.ventas.find(v => v.mes === mes);
        if (ventaMes) {
            total += parseFloat(ventaMes.monto) || 0;
        }
    });

    console.log(`El total de ventas del mes ${mes} es: ${total}`);
}

// Se calcula el total de ventas por empleado 
function totalVentasPorEmpleado() {
    const id = prompt("Ingrese el id del empleado que desea consultar: ");
    const empleado = listEmpleados.find(emp => emp.id === id);
    
    if (empleado) {
        let total = 0;
        empleado.ventas.forEach(v => {
            total += parseFloat(v.monto) || 0;
        });
        console.log(`El total de ventas del empleado ${empleado.nombre} ${empleado.apellido} es: ${total}`);
    } else {
        console.log("El empleado no existe en el sistema");
    }
}

// Se calcula el total de ventas por departamento
function totalVentasPorDepartamento() {
    const departamentos = {};
    
    listEmpleados.forEach(empleado => {
        if (!departamentos[empleado.departamento]) {
            departamentos[empleado.departamento] = 0;
        }
        
        empleado.ventas.forEach(v => {
            departamentos[empleado.departamento] += parseFloat(v.monto) || 0;
        });
    });

    console.log("El total de ventas por departamento es: ");
    for (const depto in departamentos) {
        console.log(`${depto}: ${departamentos[depto]}`);
    }
}

// Se calcula el total de ventas por cada Departamento en específico
function totalVentasPorDepartamentoEspecifico() {
    const departamentos = Array.from(new Set(listEmpleados.map(emp => emp.departamento)));
    
    console.log("Seleccione el departamento que desea consultar: ");
    departamentos.forEach((depto, index) => {
        console.log(`${index + 1}. ${depto}`);
    });

    const opcion = parseInt(prompt("Ingrese la opción que desea consultar: ")) - 1;
    const departamentoEspecifico = departamentos[opcion];

    if (departamentoEspecifico) {
        let total = 0;
        listEmpleados.filter(emp => emp.departamento === departamentoEspecifico)
            .forEach(emp => {
                emp.ventas.forEach(v => {
                    total += parseFloat(v.monto) || 0;
                });
            });
        
        console.log(`El total de ventas del departamento ${departamentoEspecifico} es: ${total}`);
    } else {
        console.log("El Departamento no existe en el sistema. Por favor, intente de nuevo..");
    }
}

// Se hace un listado de todos los empleados
function listadoEmpleados() {
    console.log("Listado de empleados: ");
    listEmpleados.forEach(empleado => {
        console.log(`ID: ${empleado.id}, Nombre: ${empleado.nombre} ${empleado.apellido}, Departamento: ${empleado.departamento}`);
    });
}

// Se calcula el total de las ventas
function totalVentas() {
    let total = 0;
    listEmpleados.forEach(empleado => {
        empleado.ventas.forEach(v => {
            total += parseFloat(v.monto) || 0;
        });
    });
    console.log(`El total de ventas es: ${total}`);
}

// Menú principal
function mostrarMenu() {
    console.log("\n=== SISTEMA DE GESTIÓN DE EMPLEADOS ===");
    console.log("1. Agregar empleado");
    console.log("2. Eliminar empleado");
    console.log("3. Modificar información de empleado");
    console.log("4. Total de ventas por mes");
    console.log("5. Total de ventas por empleado");
    console.log("6. Total de ventas por departamento");
    console.log("7. Total de ventas por departamento específico");
    console.log("8. Listado de empleados");
    console.log("9. Total general de ventas");
    console.log("10. Salir");
}

function iniciarPrograma() {
    // Polyfill para prompt en Node.js
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const prompt = (question) => {
        return new Promise(resolve => {
            readline.question(question, answer => {
                resolve(answer);
            });
        });
    };

    (async () => {
        let salir = false;
        
        while (!salir) {
            mostrarMenu();
            const opcion = await prompt("Seleccione una opción (1-10): ");
            
            switch (opcion) {
                case "1":
                    await agregarEmpleado();
                    break;
                case "2":
                    await eliminarEmpleado();
                    break;
                case "3":
                    await cambiarInformacionEmpleado();
                    break;
                case "4":
                    await totalVentasPorMes();
                    break;
                case "5":
                    await totalVentasPorEmpleado();
                    break;
                case "6":
                    await totalVentasPorDepartamento();
                    break;
                case "7":
                    await totalVentasPorDepartamentoEspecifico();
                    break;
                case "8":
                    listadoEmpleados();
                    break;
                case "9":
                    totalVentas();
                    break;
                case "10":
                    salir = true;
                    console.log("Gracias por usar el programa, vuelva pronto..");
                    readline.close();
                    break;
                default:
                    console.log("Opción no válida. Intente nuevamente.");
            }
        }
    })();
}

iniciarPrograma();