const fs = require('fs');
const prompt = require('prompt-sync')();


// Se lee el archivo de empleados, almacenados en el Array Objectos
const data = fs.readFileSync('info_empleados.csv', 'utf-8')
const empleados = data.split("\n")
console.log(empleados);


let listEmpleados = [];
function newObj(data){
    let obj = {
        id : data.split(",")[0],
        nombre : data.split(",")[1],
        apellido: data.split(",")[2],
        departamento: data.split(",")[3],
        mes: data.split(",")[4],
        ventas: data.split(",")[5],
        monto: data.split(",")[6], 
        comision: data.split(",")[7].trim()
    }
    console.log(data)
    return obj;
}

empleados.forEach(empleados => {
    const data = empleados.trim(",");
    let obj = newObj(data);

    listEmpleados.push(obj)
})

// Se agraga un nuevo empleado al sistema
let info_empleados=[];
function agregarEmpleado(){
    const nombre = prompt("Ingrese el nombre del empleado: ");
    const id = prompt("Ingrese el id del empleado: ");
    const departamento = prompt("Ingrese el nombre del departamento: ");
    const ventas = [];
    //Se usa el for para ingresar las ventas desde el mes de Enero hasta el mes de Septiembre..
    for (let i = 0; i < 9; i++) {
        const mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'];
        const venta = prompt(`Ingrese las ventas del ${mes[i]}: `);
        ventas.push(venta);

        const empleadoNuevo = {
            nombre,
            id,
            departamento,
            ventas
        };

        if (empleados.find (empleado => empleado.id === id)) {
            conosle .log("El empleado ya existe en el sistema");
        } else{
            empleados.push(empleadoNuevo);

            fs.appendFile(info_empleados.csv, `${nombre},${id},${departamento},${ventas})\n`, (err) => {
                if (err) {
                    console.log("Error al agregar el empleado", err);
                } else {
                    console.log("Empleado agregado correctamente");
                }
                
            });
        }
    }
}
// Se elimina el Empleado con el id ingresado
function eliminarEmpleado(){
    const id = prompt("Ingrese el id del empleado que desea eliminar: ");
    const empleadoEliminar = empleados.find(empleado => empleado.id === id);

    if (empleadoEliminar) {
        empleados.splice(empleados.indexOf(empleadoEliminar), 1);
        fs.writeFileSync(info_empleados.csv, empleados.join("\n"));
        console.log("Empleado eliminado correctamente");
    } else {
        console.log("El empleado no existe en el sistema");
    }
}
agregarEmpleado();
eliminarEmpleado();

//Se modofica la informacion de un empleado
function cambiarInformacionEmpleado(){
    const id = prompt("Ingrese el id del empleado que desea cambiar: ");
    const empleadoCambiar  = empleados.find(empleado => empleado.id === id);

    if (empleadoCambiar) {
        console.log("Seleccione la opcion que desea cambiar: ");
        console.log("1. ID");
        console.log("2. Nombre");
        console.log("3. Departamento");
        console.log("4. Ventas");

        const opcion = prompt("Ingrese la opcion que desea cambiar: ");

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
                const nuevoDepartamento = prompt("Ingrese el nuevo departamento: ");
                empleadoCambiar.departamento = nuevoDepartamento;
                break;
            case "4":
                const nuevasVentas = prompt("Ingrese las nuevas ventas: ");
                empleadoCambiar.ventas = nuevasVentas;
                break;
            default:
                console.log("Opcion no valida, Por favor, intente de nuevo..");
                break;
        }

        fs.writeFileSync(info_empleados.csv, empleados.join("\n"));
        console.log("Informacion del empleado modificada correctamente");
    } else {
        console.log("El empleado no existe en el sistema");
    }   
}

// Se calcula el toral de ventas por mes.
function totalVentasporMes(){
    const mes = prompt ("Ingrese el mes que desea consultar (Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre): ");
    const ventasPorMes = empleados.reduce((total, empleado) => total + empleado.ventas[mes-1], 0);
    console.log(`El total de ventas del mes ${mes} es: ${ventasPorMes}`);
}
totalVentasporMes();

// Se calcula el total de ventas por empleados 
function totalVentasporEmpleado(){
    const id = prompt("Ingrese el id del empleado que desea consultar: ");
    const empleado = empleados.find(empleado => empleado.id === id);
    if (empleado) {
        const totalVentas = empleado.ventas.reduce((total, venta) => total + venta, 0);
        console.log(`El total de ventas del empleado ${empleado.nombre} es: ${totalVentas}`);
    } else {
        console.log("El empleado no existe en el sistema");
    }
}
totalVentasporEmpleado();

// Se calcula el total de ventas por departamento
function totalVentasporDepartamento(){
    const departamentos = ["Electronica", "Electrodomesticos", "Muebles"];
    const totalVentas = {};

    departamentos.forEach(departamento => {
        const empleadosDepartamento = empleados.filter(empleado => empleado.departamento === departamento);
        const vemtasDepartamento = empleadosDepartamento.reduce((total, empleado) => total + empleado.ventas.reduce((total, venta) => total + venta, 0), 0);
        totalVentas[departamento] = vemtasDepartamento;
    });

    console,log ("El total de ventas por departamento es: ");
    departamentos.forEach(departamento => {
        console.log(`${departamento}: ${totalVentas[departamento]}`);
    });
}
totalVentasporDepartamento();

// Se calcula el total de ventas por cada Departamento ene especifico
function totalVentasporDepartamentoEspecifico(){
    const departamentos = ["Electronica", "Electrodomesticos", "Muebles"];
    console.log ("Seleccione el departamento que desea consultar: ");
    departamentos.forEach((departamento, index) => {
        console.log(`${index + 1}. ${departamento}`);
    });

    const opcion = prompt("Ingrese la opcion que desea consultar: ");
    const departamentoEspecifico = departamentos[opcion - 1];

    if (departamentoEspecifico) {
        const empleadosDepartamento = empleados.filter(empleado => empleado.departamento === departamentoEspecifico);
        const totalVentas = empleadosDepartamento.reduce((total, empleado) => total + empleado.ventas.reduce((total, venta) => total + venta, 0), 0);
        console.log(`El total de ventas del departamento ${departamentoEspecifico} es: ${totalVentas}`);
    } else {
        console.log("El Departamento no existe en el sistema. Por favor, intente de nuevo..");
    }
}

totalVentasporDepartamentoEspecifico();

// Se hace un listado de toedos los empleados
function listadoEmpleados(){
    console.log("Listado de empleados: ");
    empleados.forEach(empleado => {
        console.log(`ID: ${empleado.id}, Nombre: ${empleado.nombre}, Departamento: ${empleado.departamento}, Ventas: ${empleado.ventas}`);
    });
}
listadoEmpleados();

// SE calcula el total de las ventas.
function totalVentas(){
    const total = empleados.reduce((total, empleado) => total + empleado.ventas.reduce((total, venta) => total + venta, 0), 0);
    console.log(`El total de ventas es: ${total}`);
}
totalVentas();

//Se solicita Salir del programa 
function salirPrograma(){
    console.log("Gracias por usar el programa, vuelva pronto..");
    process.exit(0);
}   
salirPrograma();



