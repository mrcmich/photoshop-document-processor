function Pipeline(documenti) {
    this.__proto__ = PipelineAstratta;
    this._documenti = documenti;
    this._filtri = [];

    this.settaDocumenti = function(documenti) {
        this._documenti = documenti;
    };

    this.aggiungiFiltro = function(filtro) {
        this._filtri.push(filtro);
    };

    this.rimuoviFiltro = function(indiceFiltro) {
        var filtriAggiornati = [];

        indiceFiltro = Number(indiceFiltro);

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
        if (this._document.length == 0) {
            return;
        }

        for (var filtro of this._filtri) {
            filtro.esegui(this._documenti);
        }
    };

}