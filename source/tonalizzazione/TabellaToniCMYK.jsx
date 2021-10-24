//@include "../estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"
//@include "TabellaToniAstratta.jsx"

function TabellaToniCMYK(estrattoreCodiceNumerico) {
    this.__proto__ = TabellaToniAstratta;

    // Array di oggetti del tipo { id: <id>, tono: <tono> }
    this._toni = [];

    this._tonoMedio = null;

    this.settaEstrattoreCodiceNumerico = function(estrattoreCodiceNumerico) {
        asserzione(
            estrattoreCodiceNumerico != undefined, 
            "settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico)", 
            "TabellaToniCMYK", 
            "estrattoreCodiceNumerico null o undefined."
        );

        this._estrattoreCodiceNumerico = estrattoreCodiceNumerico;
    };

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

    // Ritorna undefined se la tabella è vuota
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

    this.leggiTonoMedio = function() {
        if (this._tonoMedio == null) {
            this.calcolaTonoMedio();
        }

        return this._tonoMedio;
    };

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

    // Ritorna array vuoto se la tabella è vuota
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