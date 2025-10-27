const texto = ["l", "a", "_", "c", "a", "s", "a", "_", "d", "e", "_", "p", "e", "d", "r", "o", "_", "e", "s", "_", "b", "o", "n", "i", "t", "a", "\n", "\t", "f", "i", "n"];

function procesarTexto(textoOriginal) {
    const textoA = textoOriginal.filter((_, index) => index % 2 === 0);
    const textoB = textoOriginal.filter((_, index) => index % 2 !== 0);
    return [textoA, textoB];
}

function divisionTexto(texto) {
    const mitad = texto.length / 2; 
    const parte1 = texto.slice(0, mitad);
    const parte2 = texto.slice(mitad);
    return [parte1, parte2];
}

function arregloACadena(arr) {
    return arr.join('');
}

function reemplazarCaracteres(arr) {
    return arr.map(char => {
        if (char === '_') {
            return ' ';
        }
        return char;
    });
}

function reemplazarEspaciosPorUnderscore(arr) {
    return arr.map(char => {
        if (char === ' ') {
            return '_';
        }
        return char;
    });
}

function main() {
    const [textoA, textoB] = procesarTexto(texto);
    const [parte1, parte2] = divisionTexto(textoA);

    console.log("Texto original:", arregloACadena(texto));

    console.log("\nTexto 1 (primera mitad de textoA ordenado):", arregloACadena(parte1));
    console.log("Texto 2 (segunda mitad de textoA ordenado):", arregloACadena(parte2));

    const contrasena = arregloACadena(parte1) + arregloACadena(parte2);

    const contrasenaArray = contrasena.split ? contrasena.split('') : contrasena.slice(0);
    const contrasenaInvertidaArr = contrasenaArray.slice().reverse();
    const contrasenaInvertidaStr = contrasenaInvertidaArr.join('');

    console.log("\nContraseña invertida:", contrasenaInvertidaStr);

    const contrasenaDesencriptadaArr = reemplazarCaracteres(contrasenaInvertidaArr);
    const contrasenaDesencriptadaStr = contrasenaDesencriptadaArr.join('');
    console.log("\nContraseña desencriptada:", contrasenaDesencriptadaStr);

    const contrasenaDesencriptadaInvertidaArr = contrasenaDesencriptadaArr.slice().reverse();
    const contrasenaDesencriptadaInvertidaStr = contrasenaDesencriptadaInvertidaArr.join('');
    console.log("\nContraseña desencriptada invertida:", contrasenaDesencriptadaInvertidaStr);

    const contrasenaFinalArr = reemplazarEspaciosPorUnderscore(contrasenaDesencriptadaInvertidaArr);
    const contrasenaFinalStr = contrasenaFinalArr.join('');
    console.log("\nContraseña final:", contrasenaFinalStr);
}

main();
