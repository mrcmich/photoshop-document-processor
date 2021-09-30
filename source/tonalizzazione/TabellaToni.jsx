#include "../estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"

function TabellaToni(estrattoreCodiceNumerico) {
    this.__proto__ = TabellaToniAstratta;
    this._toni = {};
    this._tonoMedio = null;

    this.settaEstrattoreCodiceNumerico = function(estrattoreCodiceNumerico) {
        if (estrattoreCodiceNumerico == undefined) {
            throw new Error(
                "Invocazione del metodo settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico) " +
                "di TabellaToni con argomento estrattoreCodiceNumerico null o undefined."
            );
        }

        this._estrattoreCodiceNumerico = estrattoreCodiceNumerico;
    };

    this.aggiungiTono = function(documento, tono) {
        var idDocumento;

        if (documento == undefined) {
            throw new Error(
                "Invocazione del metodo aggiungiTono(documento, tono) " +
                "di TabellaToni con argomento documento null o undefined."
            );
        }

        if (tono == undefined || tono.cmyk == undefined) {
            throw new Error(
                "Invocazione del metodo aggiungiTono(documento, tono) " +
                "di TabellaToni con argomento tono null, undefined o non CMYK."
            );
        }

        idDocumento = Number(this._estrattoreCodiceNumerico.estraiInfo(documento));
        this._toni[idDocumento] = tono;
    };

    // Ritorna undefined se la tabella è vuota
    this.calcolaTonoMedio = function() {
        var tonoMedio = new SolidColor();
        var numeroDocumentiTabella = 0;
        var sommeCanaliDocumenti = {
            ciano: 0,
            magenta: 0,
            giallo: 0,
            nero: 0
        };

        for (var idDocumento in this._toni) {
            numeroDocumentiTabella++;
            sommeCanaliDocumenti.ciano += this._toni[idDocumento].cmyk.cyan;
            sommeCanaliDocumenti.magenta += this._toni[idDocumento].cmyk.magenta;
            sommeCanaliDocumenti.giallo += this._toni[idDocumento].cmyk.yellow;
            sommeCanaliDocumenti.nero += this._toni[idDocumento].cmyk.black;
        }

        if (numeroDocumentiTabella == 0) {
            return;
        }

        tonoMedio.cmyk.cyan = Math.round(sommeCanaliDocumenti.ciano / numeroDocumentiTabella);
        tonoMedio.cmyk.magenta = Math.round(sommeCanaliDocumenti.magenta / numeroDocumentiTabella);
        tonoMedio.cmyk.yellow = Math.round(sommeCanaliDocumenti.giallo / numeroDocumentiTabella);
        tonoMedio.cmyk.black = Math.round(sommeCanaliDocumenti.nero / numeroDocumentiTabella);
        this._tonoMedio = tonoMedio;

        return tonoMedio;
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
                concat(this._toni[idDocumento].cmyk.cyan).concat("\t").
                concat(this._toni[idDocumento].cmyk.magenta).concat("\t").
                concat(this._toni[idDocumento].cmyk.yellow).concat("\t").
                concat(this._toni[idDocumento].cmyk.black)
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
            "".concat(this._tonoMedio.cmyk.cyan).
            concat(this._tonoMedio.cmyk.magenta).
            concat(this._tonoMedio.cmyk.yellow).
            concat(this._tonoMedio.cmyk.black)
        );

    };

    this.settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico);

}