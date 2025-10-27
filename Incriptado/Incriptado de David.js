let prompt = require('prompt-sync')({sigint: true});
let fs = require('fs');
let opcion;


let letters = [
  "<", ">", "(", ")", "{", "}", "+", "-", "'", "`", "´", '"', "º", "ª", "@", ".", ",", ":", ";", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "á", "Á", "é", "É", "í", "Í", "ó", "Ó", "ú", "Ú", "a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G", "h", "H", "i", "I", "j", "J", "k", "K", "l", "L", "m", "M", "n", "N", "ñ", "Ñ", "o", "O", "p", "P", "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", "w", "W", "x", "X", "y", "Y", "z", "Z", "\n", "<", ">", "(", ")", "{", "}",  "+", "-", "'", "`", "´", '"', "º", "ª", "@", ".", ",", ":", ";", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "á", "Á", "é", "É", "í", "Í", "ó", "Ó", "ú", "Ú", "a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G", "h", "H", "i", "I", "j", "J", "k", "K", "l", "L", "m", "M", "n", "N", "ñ", "Ñ", "o", "O", "p", "P", "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", "w", "W", "x", "X", "y", "Y", "z", "Z", "\n"
];

let encrypted = [
  "⍫", "⎋", "Ꝧ", "Ꝩ", "Ꝫ", "Ꝭ", "Ꝓ", "Ϙ", "Ϟ", "Ϡ", "Ԓ", "Ꝋ", "Ꜿ", "Ꝯ", "θ", "λ", "ψ", "ω", "π", "ä", "ö", "ü", "ß", "ç", "ş", "ğ", "μ", "δ", "φ", "б", "ф", "и", "с", "в", "у", "а", "п", "р", "ш", "о", "л", "ב", "д", "ג", "ь", "د", "т", "ر", "ж", "س", "щ", "ش", "з", "ص", "й", "đ", "к", "ơ", "ы", "ư", "е", "ẁ", "г", "א", "м", "∅", "ц", "∈", "ч", "ℵ", "н", "ℏ", "я", "∂", "ѧ", "Қ", "Җ", "Ң", "Ү", "Һ", "Ө", "Ӏ", "ჯ", "ჶ", "Ꮘ", "ꜧ", "ꝑ", "ꞓ", "ꞙ", "ꭣ", "ꮧ", "ꬽ", "ꝸ", "⨅", "Ꞙ", "⍫", "⎋", "Ꝧ", "Ꝩ", "Ꝫ", "Ꝭ", "Ꝓ", "Ϙ", "Ϟ", "Ϡ", "Ԓ", "Ꝋ", "Ꜿ", "Ꝯ", "θ", "λ", "ψ", "ω", "π", "ä", "ö", "ü", "ß", "ç", "ş", "ğ", "μ", "δ", "φ", "б", "ф", "и", "с", "в", "у", "а", "п", "р", "ш", "о", "л", "ב", "д", "ג", "ь", "د", "т", "ر", "ж", "س", "щ", "ش", "з", "ص", "й", "đ", "к", "ơ", "ы", "ư", "е", "ẁ", "г", "א", "м", "∅", "ц", "∈", "ч", "ℵ", "н", "ℏ", "я", "∂", "ѧ", "Қ", "Җ", "Ң", "Ү", "Һ", "Ө", "Ӏ", "ჯ", "ჶ", "Ꮘ", "ꜧ", "ꝑ", "ꞓ", "ꞙ", "ꭣ", "ꮧ", "ꬽ", "ꝸ", "⨅", "Ꞙ"
];
  /*'   `    ´    "    º    ª    @    .   ,    :    ;    -    0    1    2    3    4    5    6    7    8    9    _    á    Á    é    É    í    Í    ó    Ó    ú    Ú    a    A    b    B    c    C    d    D    e    E    f    F    g    G    h    H    i    I    j    J    k       K     l    L    m    M    n    N    ñ    Ñ    o    O    p    P    q    Q    r    R    s    S    t    T    u    U    v    V    w    W    x    X    y    Y    z    Z    _    a    b    c    d    e    f    g    h    i    j    k    l    m    n   ñ    
 o    p    q    r    s    t    u    v    w    x    y    z    _*/

function verify(text, array){
  return [...array].some(char => text.includes(char));
};

function getPassword(frase){
  //    let frase = "лгеьжншжпшькокадбщгшзпцпшфрчбваввввабкщчдйкдггшжщовадзапгшчщрчжмь";
  
    const texto = frase.split("");
  
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
  
    function reemplazarCaracteres(arr, de, a) {
        return arr.map(char => char === de ? a : char);
    }
  
    const [textoA, textoB] = procesarTexto(texto);
    const [parte1, parte2] = divisionTexto(textoA);
    
    const contrasena = arregloACadena(parte1) + arregloACadena(parte2);
  
    const contrasenaArray = contrasena.split ? contrasena.split('') : contrasena.slice(0);
    const contrasenaInvertidaArr = contrasenaArray.slice().reverse();
    const contrasenaInvertidaStr = contrasenaInvertidaArr.join('');
  
  
    const contrasenaDesencriptadaArr = reemplazarCaracteres(contrasenaInvertidaArr, '_', ' ');
    const contrasenaDesencriptadaStr = contrasenaDesencriptadaArr.join('');
  
    const contrasenaDesencriptadaInvertidaArr = contrasenaDesencriptadaArr.slice().reverse();
    const contrasenaDesencriptadaInvertidaStr = contrasenaDesencriptadaInvertidaArr.join('');
  
    const contrasenaFinalArr = reemplazarCaracteres(contrasenaDesencriptadaInvertidaArr, ' ', '_');
    const contrasenaFinalStr = contrasenaFinalArr.join('');
    return contrasenaFinalStr
  }

function encrypt(){
  let text = fs.readFileSync("archivoplano.csv", "utf-8");
  let arrPhrase = text.split('');
  let num = 0;
  let finalIndex;
  let random = Math.floor(Math.random() * 500) / 100 + 3;
  let encryptedText = ""; 
  let encryptedLetter = "";
  let listEncrypted = [];
  let index = 0;

  if(verify(arrPhrase, encrypted)){
    console.log("el texto ya ha sido encriptado");
  }else{
    console.log(arrPhrase);
    arrPhrase.forEach(letter => {
      
      num += random;
      index = letters.indexOf(letter);

      index = index + Math.floor(num);

      if(index > 94){
        num = 0;
        index = index+Math.floor(num);
      };

      encryptedLetter = encrypted[index];
      finalIndex = index;
      
      listEncrypted.push(encryptedLetter);
    });
    listEncrypted.push(random.toFixed(2));
    console.log(listEncrypted);
    encryptedText = listEncrypted.join("");
    fs.writeFileSync("archivoplano.csv", encryptedText, {
      encoding: 'utf-8',
      flag: 'w'
    });

    const password = getPassword(encryptedText)
    fs.writeFileSync("./contraseña.csv", password, {
      encoding: 'utf-8',
      flag: 'w'
    })
  };
};

function desEncrypt(){
  let phrase = fs.readFileSync("archivoplano.csv", "utf-8");
  let arrPhraseEncrypted = phrase.split('');
  let baseNum = arrPhraseEncrypted.splice(-4).join("");
  let randomNum = parseFloat(baseNum);
  let num = 0;
  let desEncryptedLetter = "";
  let listDesEncrypted = [];
  let index = 0;
  let originalIndex;
  let wordJoined = "";
  

  if(verify(arrPhraseEncrypted, letters)){
    console.log("este texto ya fué desencriptado");
  }else{
    let passwordRight;
    const password = prompt("ingrese la contraseña para desencriptar el archivo");

    let confirmPassword = getPassword(phrase)

    if(confirmPassword === password){

    arrPhraseEncrypted.forEach(character => {
      num += randomNum;
      index = encrypted.indexOf(character);
      index = index- Math.floor(num);

      if(index < 0 ){
        num = 0;
        originalIndex = index;
        index = letters.length + Math.floor(num);   
        index = index + originalIndex;
      }
      desEncryptedLetter = letters[index];

      listDesEncrypted.push(desEncryptedLetter);
    });
    
    wordJoined = listDesEncrypted.join('');
    fs.writeFileSync("archivoplano.csv", wordJoined, {
      encoding: 'utf-8',
      flag: 'w'
    });
    };
  };
};

function showText(){
  let fileText = fs.readFileSync("archivoplano.csv", "utf-8");
  console.log(fileText);
};

let menu = [encrypt, desEncrypt, showText];

while (opcion !== 3){
  opcion = parseInt(prompt("ingrese una opción para procesar el texto: \n\t1. Encriptar \n\t2. DesEncriptar \n\t3. Mostrar texto guardado actualmente \n\t4. Salir del programa \n\n-- "));
  opcion = opcion-1;
  if(opcion === 3) break;
  menu[opcion]();
};