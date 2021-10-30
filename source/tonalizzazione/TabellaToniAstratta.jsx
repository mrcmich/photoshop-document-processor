/**
* Oggetto JavaScript che rappresenta l'astrazione di una tabella toni, ovvero una tabella che 
* riporta, per ogni documento di un set, il relativo tono.
* Deve essere settato come prototipo di una tabella toni, la quale deve implementarne i metodi.
* @interface
*/
var TabellaToniAstratta = {

    /**
    * Metodo senza implementazione per l'aggiunta di un nuovo tono alla tabella.
    * @abstract
    * @param {Document} documento - il documento cui il tono da aggiungere fa riferimento.
    * @param {SolidColor} tono - il tono da aggiungere.
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    aggiungiTono: function(documento, tono) {
        throw new Error(
            "Invocazione del metodo astratto aggiungiTono(documento, tono) di TabellaToniAstratta."
        );
    },

    /**
    * Metodo senza implementazione per il calcolo del tono medio, valutato su tutti i toni 
    * della tabella.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @returns {SolidColor}
    */
    calcolaTonoMedio: function() {
        throw new Error(
            "Invocazione del metodo astratto calcolaTonoMedio() di TabellaToniAstratta."
        );
    },

    /**
    * Metodo senza implementazione per la formattazione dei toni della tabella e del tono medio,
    * in modo che queste informazioni siano adatte ad essere visualizzate, sotto forma di un'unica stringa.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @returns {string}
    */
    toString: function() {
        throw new Error(
            "Invocazione del metodo astratto toString() di TabellaToniAstratta."
        );
    },

    /**
    * Metodo senza implementazione per la formattazione dei toni della tabella e del tono medio,
    * in modo che queste informazioni siano adatte ad essere salvate su file.
    * Ritorna un array di stringhe, dove ogni stringa rappresenta una singola riga della tabella
    * oppure la riga corrispondente al tono medio.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @returns {Array}
    */
    toFile: function() {
        throw new Error(
            "Invocazione del metodo astratto toFile() di TabellaToniAstratta."
        );
    },

    /**
    * Metodo senza implementazione per l'eliminazione di tutti i toni finora inseriti nella tabella.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    svuota: function() {
        throw new Error(
            "Invocazione del metodo astratto svuota() di TabellaToniAstratta."
        );
    },

};