let karma = [1, 3, 5, null, 7, 3, 7, null, 7, 7, 7, 9, 8, 8, 8, 8, 8, 8];
let karmaduplicado = [];
let senderosexistentes = [1, 2, 3, 4, 5, 6];

console.log(karma);

///todo duplicado lo pongo en karmaduplicado
for (var i = karma.length - 1; i >= 0; i--) {
    if (karma.indexOf(karma[i]) !== i) {
        karmaduplicado.push((karma[i]));
        karma.splice(i, 1); //me adelanto quitando uno de los duplicados
    }
}
//ahora, en karmaduplicado puede estar mas de una vez, lo reduzco
for (var i = karmaduplicado.length - 1; i >= 0; i--) {
    if (karmaduplicado.indexOf(karmaduplicado[i]) !== i) {
        karmaduplicado.splice(i, 1);
    }
}
karma.splice(karma.indexOf(null), 1);
karmaduplicado.splice(karmaduplicado.indexOf(null), 1);
//ahora quito en karma todos los que esten en karmaduplicado
for (var d = karmaduplicado.length - 1; d >= 0; d--) {
    if (karma.indexOf(karmaduplicado[d]) != -1)

        karma.splice(karma.indexOf(karmaduplicado[d]), 1);




}

console.log("karma ", karma);
console.log("karmaduplicado ", karmaduplicado);
karma.forEach((cada) => {
    if (senderosexistentes.indexOf(cada) == -1) {
        //el sendero no esta ocupado entonces dibujo el camino
        //dibujaKarma(cada);
        console.log(cada, ' karma');
    } else {
        // dibujo un + sobre el sendero
        //console.log("simbolo en: ", cada);
        //poneSimboloSuma(cada);
        console.log(cada, ' cruz');
    }
});

