
// let v_nombre = "maria victoria";
// let v_apellido1 = "jimenez";
// let v_apellido2 = "arrabal";
// // // v_nombre = "francísCoss";
// // // v_apellido1 = "francísCoss";
// // // v_apellido2 = "francísCoss";

// let v_dia = 24;
// let v_mes = 4;
// let v_año = 1977;
let v_nombre = "vivianne";
let v_apellido1 = "burguete";
let v_apellido2 = "martinez";
let v_dia = 26;
let v_mes = 12;
let v_año = 1971;

// v_nombre = "francísCoss";
// v_apellido1 = "francísCoss";
// v_apellido2 = "francísCoss";
// v_dia = 8;
// v_mes = 6;
// v_año = 1977;
let muestraError = "";
let ficha = [];
let secreto = [];
let fichaConSectreto = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let flagFichaLlena = false;
//let prueba = '¶çHoñü el  Ló  c';
// let caracteresTodos;
// for (let t = 14; t <= 255; t++) {
//     caracteresTodos = caracteresTodos + String.fromCharCode(t);
// }

const alfabeto = [
    ["A", 1, 1],
    ["B", 2, 2],
    ["C", 3, 3],
    ["CH", 4, 4],
    ["D", 5, 5],
    ["E", 6, 6],
    ["F", 7, 7],
    ["G", 8, 8],
    ["H", 9, 9],
    ["I", 1, 10],
    ["J", 2, 20],
    ["K", 3, 30],
    ["L", 4, 40],
    ["LL", 5, 50],
    ["M", 6, 60],
    ["N", 7, 70],
    ["Ñ", 8, 80],
    ["O", 9, 90],
    ["P", 1, 100],
    ["Q", 2, 200],
    ["R", 3, 300],
    ["S", 4, 400],
    ["T", 5, 500],
    ["U", 6, 600],
    ["V", 7, 700],
    ["W", 8, 800],
    ["X", 9, 900],
    ["Y", 1, 1000],
    ["Z", 2, 2000],
    [" ", 0, 0],
];

function llenarFicha() {
    v_nombre = desglosar(v_nombre)[0];
    ficha[1] = [numero(v_nombre), null, null];
    secreto[0] = numeroSecreto(v_nombre);

    v_apellido1 = desglosar(v_apellido1)[0];
    ficha[2] = [numero(v_apellido1), null, null];
    secreto[1] = numeroSecreto(v_apellido1);

    v_apellido2 = desglosar(v_apellido2)[0];
    ficha[3] = [numero(v_apellido2), null, null];
    secreto[2] = numeroSecreto(v_apellido2);

    ficha[4] = [reduccionA22(v_dia), null, null];
    ficha[5] = [parseInt(v_mes), null, null];
    ficha[6] = [reduccionA22(v_año), null, null];
    ficha[7] = [
        reduccionA22(ficha[1][0] + ficha[2][0] + ficha[3][0]),
        null,
        null,
    ];
    ficha[8] = [
        reduccionA22(ficha[4][0] + ficha[5][0] + ficha[6][0]),
        null,
        null,
    ];
    ficha[9] = [reduccionA22(ficha[7][0] + ficha[8][0]), null, null];
    ficha[10] = [reduccionA22(ficha[1][0] + ficha[2][0]), null, null];
    ficha[11] = [reduccionA22(ficha[2][0] + ficha[3][0]), null, null];
    ficha[12] = [reduccionA22(ficha[4][0] + ficha[5][0]), null, null];
    ficha[13] = [reduccionA22(ficha[5][0] + ficha[6][0]), null, null];
    ficha[20] = [reduccionA22(ficha[10][0] + ficha[11][0]), null, null];
    ficha[21] = [reduccionA22(ficha[12][0] + ficha[13][0]), null, null];
    ficha[22] = [reduccionA22(ficha[20][0] + ficha[21][0]), null, null];

    //Ahora completar familias de numeros
    for (let t = 1; t <= 13; t++) {
        ficha[t][1] = reduccionA9(ficha[t][0]);
        ficha[t][2] = reduccionA9(ficha[t][1]);
    }
    for (let t = 20; t <= 22; t++) {
        ficha[t][1] = reduccionA9(ficha[t][0]);
        ficha[t][2] = reduccionA9(ficha[t][1]);
    }
    console.log(ficha);
    // Ahora intento llenar las familias
    for (let qq = 7; qq <= 13; qq++) {
        if (ficha[qq][1] == null) {
            ficha[qq][1] = intentaLlenar(qq);
        } else if (ficha[qq][2] == null) {
            ficha[qq][2] = intentaLlenar(qq);
        }
    }
    for (let qq = 20; qq <= 22; qq++) {
        if (ficha[qq][1] == null) {
            ficha[qq][1] = intentaLlenar(qq);
        } else if (ficha[qq][2] == null) {
            ficha[qq][2] = intentaLlenar(qq);
        }
    }
    console.log(ficha);
    //ahora solo sobre las familias incompletas rellenamos con el numero secreto. sin repetidos
    for (let r = 1; r <= 3; r++) {
        if (!verifFamiliaCompleta(r)) {
            completaConSecreto(r);
        }
    }
    //ahora vuelvo a intentar completar la familia, el resultado tambien es secreto
    for (let qq = 7; qq <= 13; qq++) {
        if (ficha[qq][1] == null) {
            ficha[qq][1] = intentaLlenar(qq);
            fichaConSectreto[qq] = ficha[qq][1] || 0;
        } else if (ficha[qq][2] == null) {
            ficha[qq][2] = intentaLlenar(qq);
            fichaConSectreto[qq] = ficha[qq][2] || 0;
        }
    }
    for (let qq = 20; qq <= 22; qq++) {
        if (ficha[qq][1] == null) {
            ficha[qq][1] = intentaLlenar(qq);
            fichaConSectreto[qq] = ficha[qq][1] || 0;
        } else if (ficha[qq][2] == null) {
            ficha[qq][2] = intentaLlenar(qq);
            fichaConSectreto[qq] = ficha[qq][2] || 0;
        }
    }
    flagFichaLlena = true;

}

function completaConSecreto(cual) {

    let cualsecreto = secreto[cual - 1];

    let existe1 = ficha[cual][0];
    let existe2 = ficha[cual][1];
    let existe3 = ficha[cual][2];
    if (existe1 == cualsecreto) {
        return;
    }
    if (existe2 == cualsecreto) {
        return;
    }
    if (existe3 == cualsecreto) {
        return;
    }
    if (existe2 == null) {
        ficha[cual][1] = cualsecreto;
        fichaConSectreto[cual] = cualsecreto;
        return;
    } else {
        if (existe3 == null) {
            ficha[cual][2] = cualsecreto;
            fichaConSectreto[cual] = cualsecreto;
            return;
        }
    }
}

function verifFamiliaCompleta(cual) {
    let copia = [...ficha[cual]];
    copia.sort(function (a, b) {
        return b - a;
    });
    let existe1 = copia[0];
    let existe2 = copia[1];
    let existe3 = copia[2];
    switch (existe1) {
        case 22:
            if (existe2 == 13 && existe3 == 4) {
                return true;
            } else return false;
            break;
        case 21:
            if (existe2 == 12 && existe3 == 3) {
                return true;
            } else return false;
            break;
        case 20:
            if (existe2 == 11 && existe3 == 2) {
                return true;
            } else return false;
            break;
        case 19:
            if (existe2 == 10 && existe3 == 1) {
                return true;
            } else return false;
            break;
        case 18:
            if (existe2 == 9) {
                return true;
            } else return false;
            break;
        case 17:
            if (existe2 == 8) {
                return true;
            } else return false;
            break;
        case 16:
            if (existe2 == 7) {
                return true;
            } else return false;
            break;
        case 15:
            if (existe2 == 6) {
                return true;
            } else return false;
            break;
        case 14:
            if (existe2 == 5) {
                return true;
            } else return false;
            break;
        default:
            return false;
    }
}

function intentaLlenar(cual) {
    let existe1 = ficha[cual][0];
    let existe2 = ficha[cual][1] || 0;
    let existe3 = ficha[cual][2] || 0;
    let intento1;
    let intento2;
    let intento3;
    if (cual == 7) {
        intento1 = ficha[1];
        intento2 = ficha[2];
        intento3 = ficha[3];
        return combinacionesDeSumas3(
            intento1,
            intento2,
            intento3,
            existe1,
            existe2, existe3
        );
    }
    if (cual == 8) {
        intento1 = ficha[4];
        intento2 = ficha[5];
        intento3 = ficha[6];
        return combinacionesDeSumas3(
            intento1,
            intento2,
            intento3,
            existe1,
            existe2, existe3
        );
    }
    if (cual == 9) {
        intento1 = ficha[7];
        intento2 = ficha[8];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 10) {
        intento1 = ficha[1];
        intento2 = ficha[2];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 11) {
        intento1 = ficha[2];
        intento2 = ficha[3];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 12) {
        intento1 = ficha[4];
        intento2 = ficha[5];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 13) {
        intento1 = ficha[5];
        intento2 = ficha[6];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 20) {
        intento1 = ficha[10];
        intento2 = ficha[11];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 21) {
        intento1 = ficha[12];
        intento2 = ficha[13];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
    if (cual == 22) {
        intento1 = ficha[20];
        intento2 = ficha[21];
        return combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3);
    }
}


function combinacionesDeSumas3(intento1, intento2, intento3, existe1, existe2, existe3) {
    let resultado;
    for (let r = 0; r <= 2; r++) {
        if (intento1[r] == null) {
            break;
        }
        for (let s = 0; s <= 2; s++) {
            if (intento2[s] == null) {
                break;
            }
            for (let t = 0; t <= 2; t++) {
                if (intento3[t] == null) {
                    break;
                }
                resultado = reduccionA22(intento1[r] + intento2[s] + intento3[t]);
                if (resultado != existe1 && resultado != existe2 && resultado != existe3) {
                    return resultado;
                }
            }
        }
    }
    return null;
}
function combinacionesDeSumas2(intento1, intento2, existe1, existe2, existe3) {
    let resultado;
    for (let r = 0; r <= 2; r++) {
        if (intento1[r] == null) {
            break;
        }
        for (let s = 0; s <= 2; s++) {
            if (intento2[s] == null) {
                break;
            }
            resultado = reduccionA22(intento1[r] + intento2[s]);
            if (resultado != existe1 && resultado != existe2 && resultado != existe3) {
                return resultado;
            }
        }
    }
    return null;
}

function numero(que) {
    return reduccionA22(desglosar(que)[1]);
}
function numeroSecreto(que) {
    return reduccionA22(desglosar(que)[2]);
}

function reduccionA9(que) {

    if (que > 22) {
        muestraError =
            "error de interpretacioon en los calculos, por favor avise al administrador";
        return;
    }
    if (que <= 9) return null;
    if (que == 19) return 10;
    let unidades = que % 10;
    let decenas = Math.trunc(que / 10) % 10;
    return unidades + decenas;
}

function reduccionA22(que) {
    if (que <= 22) return parseInt(que);
    let unidades = que % 10;
    let decenas = Math.trunc(que / 10) % 10;
    let centenas = Math.trunc(que / 100) % 10;
    let miles = Math.trunc(que / 1000) % 10;
    let decenamiles = Math.trunc(que / 10000) % 10;
    let centenamiles = Math.trunc(que / 100000) % 10;
    let millones = Math.trunc(que / 1000000) % 10;
    return parseInt(reduccionA22(
        unidades +
        decenas +
        centenas +
        miles +
        decenamiles +
        centenamiles +
        millones
    ));
}

function desglosar(que) {
    //que las letras esten en el alfabeto
    que = que.toUpperCase();
    que = eliminarDiacriticos(que);
    let sumaNormal = 0,
        sumaOculta = 0;
    let letra, valor, valorsecreto;
    for (let t = 0; t < que.length; t++) {
        letra = que[t];
        if (letra == "C" && t < que.length - 1 && que[t + 1] == "H") {
            letra = "CH";
            t++;
        }
        if (letra == "L" && t < que.length - 1 && que[t + 1] == "L") {
            letra = "LL";
            t++;
        }
        let puntero = 0;
        try {
            while (alfabeto[puntero][0] != letra) {
                puntero++;
            }
        } catch {
            muestraError = "la letra " + letra + " no está en el diccionario";
            return;
        }
        valor = alfabeto[puntero][1];
        valorsecreto = alfabeto[puntero][2];
        //console.log(letra, valor, valorsecreto);
        sumaNormal = sumaNormal + alfabeto[puntero][1];
        sumaOculta = sumaOculta + alfabeto[puntero][2];
    }
    //console.log('filtrado: ', que);
    return [que, sumaNormal, sumaOculta];
}

function eliminarDiacriticos(texto) {
    return texto
        .normalize("NFD")
        .replace(
            /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
            "$1"
        )
        .normalize()
        .replace(/[^[A-ZÑ ]]*/g, "")
        .replace(/[[]*/g, "");
}

//console.log(caracteresTodos);
//desglosar(caracteresTodos);

