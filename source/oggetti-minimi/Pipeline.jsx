#include "PipelineAstratta.jsx"
#include "Asserzione.jsx"

function Pipeline(documenti) {
    this.__proto__ = PipelineAstratta;
    this._filtri = [];

    this.settaDocumenti = function(documenti) {
        asserzione(
            documenti != undefined, 
            "settaDocumenti(documenti)", 
            "Pipeline", 
            "documenti null o undefined."
        );

        this._documenti = documenti;
    };

    this.aggiungiFiltro = function(filtro) {
         asserzione(
            filtro != undefined, 
            "aggiungiFiltro(filtro)", 
            "Pipeline", 
            "filtro null o undefined."
        );

        this._filtri.push(filtro);
    };

    // indiceFiltro è assunto numerico (number o stringa convertibile in numero)
    this.rimuoviFiltro = function(indiceFiltro) {
        asserzione(
            indiceFiltro != undefined, 
            "aggiungiFiltro(filtro)", 
            "Pipeline", 
            "filtro null o undefined."
        );

        indiceFiltro = Math.round(Number(indiceFiltro));

        if (indiceFiltro < 0 || indiceFiltro >= this._filtri.length) {
            return;
        }

        this._filtri.splice(indiceFiltro, 1);
    };

    this.leggiFiltri = function() {
        return this._filtri;
    }

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
        if (this._documenti.length != 0) {
            for (var i = 0; i < this._filtri.length; i++) {
                this._filtri[i].esegui(this._documenti);
            }
        }

        beep();
        alert("Elaborazioni terminate. Controlla i documenti processati.", "Elaborazioni terminate");
        
    };

    this.concatena = function(pipeline) {
        var filtriAccodati; 

        asserzione(
            pipeline != undefined, 
            "concatena(pipeline)", 
            "Pipeline", 
            "pipeline null o undefined."
        );

        filtriAccodati = pipeline.leggiFiltri();

        if (filtriAccodati.length == 0) {
            return this;
        }

        for (var i = 0; i < filtriAccodati.length; i++) {
            this.aggiungiFiltro(filtriAccodati[i]);
        }

        return this;
    };

    this.settaDocumenti(documenti);

}