#include "../estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"
#include "../oggetti-minimi/Asserzione.jsx"
#include "TabellaToniAstratta.jsx"

function TabellaToniCMYK(estrattoreCodiceNumerico) {
    this.__proto__ = TabellaToniAstratta;
    this._toni = {};
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
        this._toni[idDocumento] = tono;
    };

    // Ritorna undefined se la tabella è vuota
    this.calcolaTonoMedio = function() {
        var tonoMedio = new SolidColor().cmyk;
        var numeroDocumentiTabella = 0;
        var sommeCanaliDocumenti = {
            ciano: 0,
            magenta: 0,
            giallo: 0,
            nero: 0
        };

        for (var idDocumento in this._toni) {
            numeroDocumentiTabella++;
            sommeCanaliDocumenti.ciano += this._toni[idDocumento].cyan;
            sommeCanaliDocumenti.magenta += this._toni[idDocumento].magenta;
            sommeCanaliDocumenti.giallo += this._toni[idDocumento].yellow;
            sommeCanaliDocumenti.nero += this._toni[idDocumento].black;
        }

        if (numeroDocumentiTabella == 0) {
            return;
        }

        tonoMedio.cyan = Math.round(sommeCanaliDocumenti.ciano / numeroDocumentiTabella);
        tonoMedio.magenta = Math.round(sommeCanaliDocumenti.magenta / numeroDocumentiTabella);
        tonoMedio.yellow = Math.round(sommeCanaliDocumenti.giallo / numeroDocumentiTabella);
        tonoMedio.black = Math.round(sommeCanaliDocumenti.nero / numeroDocumentiTabella);
        this._tonoMedio = tonoMedio;

        return tonoMedio;
    };

    this.leggiTonoMedio = function() {
        if (this._tonoMedio == null) {
            this.calcolaTonoMedio();
        }

        return this._tonoMedio;
    };

    // Ritorna array vuoto se la tabella è vuota
    this.toString = function() {
        var righeTabella = [];
        var numeroDocumentiTabella = 0;

        righeTabella.push("DOC   C\tM\tY\tK");

        for (var idDocumento in this._toni) {
            numeroDocumentiTabella++;

            righeTabella.push(
                "".concat(idDocumento).concat("\t").
                concat(this._toni[idDocumento].cyan).concat("\t").
                concat(this._toni[idDocumento].magenta).concat("\t").
                concat(this._toni[idDocumento].yellow).concat("\t").
                concat(this._toni[idDocumento].black)
            );
        }

        if (numeroDocumentiTabella == 0) {
            return [];
        }

        if (this._tonoMedio == null) {
            this.calcolaTonoMedio();
        }

        righeTabella.push("");
        righeTabella.push("Tono medio:");
        righeTabella.push("C\tM\tY\tK");
        righeTabella.push(
            "".concat(this._tonoMedio.cyan).
            concat(this._tonoMedio.magenta).
            concat(this._tonoMedio.yellow).
            concat(this._tonoMedio.black)
        );

    };

    this.settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico);

}