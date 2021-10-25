//@include "../estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"
//@include "TabellaToniAstratta.jsx"

/**
* Constructor function per la creazione di una nuova tabella dei toni, dove i toni
* sono espressi secondo il metodo colore CMYK. Si noti che i toni della tabella sono indicizzati
* mediante il codice numerico del documento cui si riferiscono, e sono ordinati sulla base di tale
* indice (in ordine crescente).
* @param {EstrattoreInfoAstratto} estrattoreCodiceNumerico - l'estrattore di informazioni utilizzato per estrarre il codice numerico dei documenti, usato come indice della tabella.
* @constructor
*/
function TabellaToniCMYK(estrattoreCodiceNumerico) {
    this.__proto__ = TabellaToniAstratta;

    /**
    * Array contenente i toni della tabella, memorizzati come oggetti con chiavi id (l'indice)
    * e tono (il tono vero e proprio).
    * @type {Array}
    * @protected
    */
    this._toni = [];

    /**
    * Attributo che rappresenta il tono medio, valutato su tutti i toni della tabella.
    * @type {SolidColor}
    * @protected
    */
    this._tonoMedio = null;

    /**
    * L'estrattore di informazioni utilizzato per estrarre il codice numerico dei documenti.
    * @type {EstrattoreInfoAstratto}
    * @protected
    */
    this._estrattoreCodiceNumerico = null;

    /**
    * Metodo setter per _estrattoreCodiceNumerico.
    * @param {EstrattoreInfoAstratto} estrattoreCodiceNumerico - l'estrattore di informazioni utilizzato per estrarre il codice numerico dei documenti, usato come indice della tabella.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @returns {undefined}
    */
    this.settaEstrattoreCodiceNumerico = function(estrattoreCodiceNumerico) {
        asserzione(
            estrattoreCodiceNumerico != undefined, 
            "settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico)", 
            "TabellaToniCMYK", 
            "estrattoreCodiceNumerico null o undefined."
        );

        this._estrattoreCodiceNumerico = estrattoreCodiceNumerico;
    };

    /**
    * Metodo per l'aggiunta di un nuovo tono alla tabella.
    * @param {Document} documento - il documento cui il tono da aggiungere fa riferimento.
    * @param {SolidColor} tono - il tono da aggiungere.
    * @throws Lancia un errore se almeno uno dei parametri passati è null o undefined.
    * @returns {undefined}
    */
    this.aggiungiTono = function(documento, tono) {
        var idDocumento;
        var entryTabella = {};

        asserzione(
            documento != undefined, 
            "aggiungiTono(documento, tono)", 
            "TabellaToniCMYK", 
            "documento null o undefined."
        );

        asserzione(
            tono != undefined, 
            "aggiungiTono(documento, tono)", 
            "TabellaToniCMYK", 
            "tono null o undefined."
        );

        idDocumento = Number(this._estrattoreCodiceNumerico.estraiInfo(documento));
        entryTabella.id = idDocumento;
        entryTabella.tono = tono;
        this._toni.push(entryTabella);
        
        this._toni.sort(function(entry1, entry2) {
            return Number(entry1.id) - Number(entry2.id);
        });
    };

    /**
    * Metodo per il calcolo del tono medio, valutato su tutti i toni 
    * della tabella. Ritorna undefined se la tabella è vuota.
    * @returns {SolidColor}
    */
    this.calcolaTonoMedio = function() {
        var tonoMedio = new SolidColor().cmyk;
        var tonoCorrente;
        var sommeCanaliDocumenti = {
            ciano: 0,
            magenta: 0,
            giallo: 0,
            nero: 0
        };

        if (this._toni.length == 0) {
            return;
        }

        for (var i = 0; i < this._toni.length; i++) {
            tonoCorrente = this._toni[i].tono;
            sommeCanaliDocumenti.ciano += tonoCorrente.cyan;
            sommeCanaliDocumenti.magenta += tonoCorrente.magenta;
            sommeCanaliDocumenti.giallo += tonoCorrente.yellow;
            sommeCanaliDocumenti.nero += tonoCorrente.black;
        }

        tonoMedio.cyan = Math.round(sommeCanaliDocumenti.ciano / this._toni.length);
        tonoMedio.magenta = Math.round(sommeCanaliDocumenti.magenta / this._toni.length);
        tonoMedio.yellow = Math.round(sommeCanaliDocumenti.giallo / this._toni.length);
        tonoMedio.black = Math.round(sommeCanaliDocumenti.nero / this._toni.length);
        this._tonoMedio = tonoMedio;

        return tonoMedio;
    };

    /**
    * Metodo getter per _tonoMedio. 
    * Invoca il metodo calcolaTonoMedio() se _tonoMedio è null o undefined.
    * @returns {SolidColor}
    */
    this.leggiTonoMedio = function() {
        if (this._tonoMedio == null) {
            this.calcolaTonoMedio();
        }

        return this._tonoMedio;
    };

    /**
    * Metodo per la formattazione dei toni della tabella e del tono medio,
    * in modo che queste informazioni siano adatte ad essere visualizzate, sotto forma di un'unica stringa.
    * Ritorna undefined se la tabella è vuota.
    * @returns {string}
    */
    this.toString = function() {
        var tabella = "";
        var tonoCorrente;

        if (this._toni.length == 0) {
            return;
        }

        tabella = tabella.concat(
            "Per ogni documento, si riporta la quaterna di valori [C, M, Y, K] corrispondente:\n"
        );

        for (var i = 0; i < this._toni.length; i++) {
            tonoCorrente = this._toni[i].tono;

            tabella = tabella.concat(this._toni[i].id).concat(": [").
                concat(tonoCorrente.cyan).concat(", ").
                concat(tonoCorrente.magenta).concat(", ").
                concat(tonoCorrente.yellow).concat(", ").
                concat(tonoCorrente.black).concat("]\n")
            ;
        }

        if (this._tonoMedio == null) {
            this.calcolaTonoMedio();
        }

        tabella = tabella.concat("\nIl tono medio, valutato su tutti i documenti, è il seguente: \n[").
            concat(this._tonoMedio.cyan).concat(", ").
            concat(this._tonoMedio.magenta).concat(", ").
            concat(this._tonoMedio.yellow).concat(", ").
            concat(this._tonoMedio.black).concat("]")
        ;

        return tabella;
    };

    /**
    * Metodo per la formattazione dei toni della tabella e del tono medio,
    * in modo che queste informazioni siano adatte ad essere salvate su file.
    * Ritorna un array di stringhe, dove ogni stringa rappresenta una singola riga della tabella
    * oppure la riga corrispondente al tono medio. Se la tabella è vuota, ritorna invece undefined.
    * @returns {Array}
    */
    this.toFile = function() {
        var righeTabella = [];
        var tonoCorrente;

        if (this._toni.length == 0) {
            return;
        }

        righeTabella.push("Per ogni documento, si riporta la quaterna di valori [C, M, Y, K] corrispondente:");

        for (var i = 0; i < this._toni.length; i++) {
            tonoCorrente = this._toni[i].tono;

            righeTabella.push(
                "".concat(this._toni[i].id).concat(": [").
                concat(tonoCorrente.cyan).concat(", ").
                concat(tonoCorrente.magenta).concat(", ").
                concat(tonoCorrente.yellow).concat(", ").
                concat(tonoCorrente.black).concat("]")
            );
        }

        if (this._tonoMedio == null) {
            this.calcolaTonoMedio();
        }

        righeTabella.push(" ");
        righeTabella.push("Il tono medio, valutato su tutti i documenti, è il seguente:");

        righeTabella.push(
            ("[").concat(this._tonoMedio.cyan).concat(", ").
            concat(this._tonoMedio.magenta).concat(", ").
            concat(this._tonoMedio.yellow).concat(", ").
            concat(this._tonoMedio.black).concat("]")
        );

        return righeTabella;
    };

    this.settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico);

}