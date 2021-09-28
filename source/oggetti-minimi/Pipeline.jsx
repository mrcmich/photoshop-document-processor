#include "PipelineAstratta.jsx"

function Pipeline(documenti) {
    this.__proto__ = PipelineAstratta;
    this._filtri = [];

    this.settaDocumenti = function(documenti) {
        if (documenti == undefined) {
            throw new Error(
                "Invocazione del metodo settaDocumenti(documenti) di Pipeline con argomento documenti null o undefined."
            );
        }

        this._documenti = documenti;
    };

    this.settaDocumenti(documenti);

    this.aggiungiFiltro = function(filtro) {
        if (filtro == undefined) {
            throw new Error(
                "Invocazione del metodo aggiungiFiltro(filtro) di Pipeline con argomento filtro null o undefined."
            );
        }

        this._filtri.push(filtro);
    };

    this.rimuoviFiltro = function(indiceFiltro) {
        var filtriAggiornati = [];

        indiceFiltro = Math.round(Number(indiceFiltro));

        if (indiceFiltro < 0 || indiceFiltro >= this._filtri.length) {
            return;
        }

        for (var i = 0; i < this._filtri.length; i++) {
            if (i != indiceFiltro) {
                filtriAggiornati.push(this._filtri[i]);
            }
        }

        this._filtri = filtriAggiornati;
    };


    this.elencoFiltri = function() {
        var elencoFiltri = "";

        if (this._filtri.length == 0) {
            return "{ }";
        }

        elencoFiltri += "{ ";

        for (var i = 0; i < this._filtri.length; i++) {
            elencoFiltri += (i + ": " + this._filtri[i].leggiNome());

            if (i != this._filtri.length - 1) {
                elencoFiltri += ", ";
            }
        }

        elencoFiltri += " }";

        return elencoFiltri;
    };

    this.svuota = function() {
        this._filtri.length = 0;
    };

    this.esegui = function() {   
        if (this._documenti.length == 0) {
            return;
        }

        for (var i = 0; i < this._filtri.length; i++) {
            this._filtri[i].esegui(this._documenti);
        }
    };

    this.leggiFiltri = function() {
        return this._filtri;
    };

    this.concatena = function(pipeline) {
        var filtriAccodati; 

        if (pipeline == undefined) {
            throw new Error(
                "Invocazione del metodo concatena(pipeline) di Pipeline con argomento pipeline null o undefined."
            );
        }

        filtriAccodati = pipeline.leggiFiltri();

        if (filtriAccodati.length == 0) {
            return this;
        }

        for (var i = 0; i < filtriAccodati.length; i++) {
            this.aggiungiFiltro(filtriAccodati[i]);
        }

        return this;
    };

}