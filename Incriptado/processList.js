const lista = [ "L", "a", "_", "c", "a", "s", "a", "_", "d", "e", "_", "p", "e", "d", "r", "o", "_", "e", "s", "_", "b", "o", "n", "i", "t", "a"];

// Crear dos listas usando métodos permitidos de arrays
const lista1 = lista.filter((_, index) => index % 2 === 0); // posiciones pares: 0,2,4,...
const lista2 = lista.filter((_, index) => index % 2 !== 0); // posiciones impares: 1,3,5,...

// Función para dividir una lista en dos mitades usando slice
function dividirLista(lista) {
  const mitad = Math.ceil(lista.length / 2);
  return [lista.slice(0, mitad), lista.slice(mitad)];
}

// Dividir ambas listas en dos mitades
const [lista1_1, lista1_2] = dividirLista(lista1);
const [lista2_1, lista2_2] = dividirLista(lista2);

// Función para convertir lista de caracteres a palabra, reemplazando "_" por espacio usando map y join
function listaAOracion(lista) {
  return lista.map(char => char === '_' ? ' ' : char).join('');
}

// Imprimir las primeras mitades de cada lista como oraciones en una sola línea
const resultado = listaAOracion(lista1_1) + ' ' + listaAOracion(lista2_1);
console.log(resultado);
