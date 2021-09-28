function PosizionatoreLivello(margine) {
    this.__proto__ = PosizionatoreLivelloAstratto;

    this.settaLivello = function(livello) {
        if (livello == undefined) {
            throw new TypeError(
                `Invocazione del metodo settaLivello(livello) di PosizionatoreLivello
                con argomento livello null o undefined.`
            );
        }

        this._livello = livello;
    };

    this.leggiLivello = function() {
        return this._livello;
    };

    this.leggiRegioneLivello = function() {
        return this._regioneLivello;
    };

    this.settaMargine = function(margine = this.MARGINE_DEFAULT) {
        margine = Number(margine);

        if (margine < 0) {
             throw new SyntaxError(
                `Invocazione del metodo settaMargine(margine) di PosizionatoreLivello
                con argomento margine negativo.`
            );
        }

        this._margine = margine;
    };

    this.leggiMargine = function() {
        return this._margine;
    };

    this.rilevaRegione = function(livello) {
        var bordiLivello;
        var larghezzaDocumento;
        var ascissaMediaLivello;
        
        this.settaLivello(livello);
        bordiLivello = livello.bounds;
        larghezzaDocumento = livello.parent.width;
        ascissaMediaLivello = (bordiLivello[0] + bordiLivello[2]) / 2;

        if (ascissaMediaLivello < larghezzaDocumento / 3) {
		    this._regioneLivello = this.REGIONE_SINISTRA;
	    } else if (ascissaMediaLivello > (2/3) * larghezzaDocumento) {
		    this._regioneLivello = this.REGIONE_DESTRA;
	    } else {
            this._regioneLivello = this.REGIONE_CENTRALE;
        }

    };

    this.riposizionaLivello = function() {
        var margine = this._margine;

        if (this._livello == undefined || this._regioneLivello == undefined) {
            return;
        }

        if (this._margine > (1/2) * Math.min(this._livello.parent.width, this._livello.parent.height)) {
             margine = this.MARGINE_DEFAULT;
        }

        this._allineaVerticalmenteLivello(margine);
        this._allineaOrizzontalmenteLivello(margine);
    };

    this._allineaVerticalmenteLivello = function(margine) {
        var bordiLivello;
        var ordinataMinimaLivello;

        bordiLivello = this._livello.bounds;
        ordinataMinimaLivello = bordiLivello[1].value;
        this._livello.translate(0, margine - ordinataMinimaLivello);
    };

    this._allineaOrizzontalmenteLivello = function(margine) {
        var bordiLivello;
        var larghezzaDocumento;
        var ascissaMinimaLivello;
        var ascissaMassimaLivello;

        bordiLivello = this._livello.bounds;
        larghezzaDocumento = this._livello.parent.width;
        ascissaMinimaLivello = bordiLivello[0].value;
        ascissaMassimaLivello = bordiLivello[2].value;

        if (this._regioneLivello == this.REGIONE_SINISTRA) {
		    this._livello.translate(margine - ascissaMinimaLivello, 0);
	    } else if (this._regioneLivello == this.REGIONE_DESTRA) {
            this._livello.translate(larghezzaDocumento - margine - ascissaMassimaLivello, 0);
	    } else if (this._regioneLivello == this.REGIONE_CENTRALE) {
            this._livello.translate((larghezzaDocumento - ascissaMinimaLivello - ascissaMassimaLivello) / 2, 0);
	    }

    };

    this.settaMargine(margine);

}
