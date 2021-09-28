function PosizionatoreLivello() {
    this.__proto__ = PosizionatoreLivelloAstratto;

    this.rilevaRegione = function(livello) {
        var bordiLivello;
        var larghezzaDocumento;
        var ascissaMediaLivello;
        
        if (livello == undefined) {
            throw new TypeError(
                `Invocazione del metodo rilevaRegione(livello) di PosizionatoreLivello
                con argomento livello null o undefined.`
            );
        }

        bordiLivello = livello.bounds;
        larghezzaDocumento = livello.parent.width;
        ascissaMediaLivello = (bordiLivello[0] + bordiLivello[2]) / 2;

        if (ascissaMediaLivello < larghezzaDocumento / 3) {
		    this._regioneLivello = this.REGIONE_SINISTRA;
	    }

        if (ascissaMediaLivello > (2/3) * larghezzaDocumento) {
		    this._regioneLivello = this.REGIONE_DESTRA;
	    }

        this._regioneLivello = this.REGIONE_CENTRALE;
    };

    this.riposizionaLivello = function(livello, margine) {
        if (livello == undefined) {
            throw new TypeError(
                `Invocazione del metodo riposizionaLivello(livello, margine) di PosizionatoreLivello
                con argomento livello null o undefined.`
            );
        }

        margine = Number(margine);

        if (margine < 0 || margine > (1/2) * Math.min(livello.parent.width, livello.parent.height)) {
             throw new SyntaxError(
                `Invocazione del metodo riposizionaLivello(livello, margine) di PosizionatoreLivello
                con argomento margine non valido (margine = ${margine}).`
            );
        }

        this._allineaVerticalmenteLivello(livello, margine);
        this._allineaOrizzontalmenteLivello(livello, margine);
    };

    this._allineaVerticalmenteLivello = function(livello, margine) {
        var bordiLivello;
        var ordinataMinimaLivello;

        bordiLivello = livello.bounds;
        ordinataMinimaLivello = bordiLivello[1].value;
        livello.translate(0, margine - ordinataMinimaLivello);
    };

    this._allineaOrizzontalmenteLivello = function(livello, margine) {
        var bordiLivello;
        var larghezzaDocumento;
        var ascissaMinimaLivello;
        var ascissaMassimaLivello;

        bordiLivello = livello.bounds;
        larghezzaDocumento = livello.parent.width;
        ascissaMinimaLivello = bordiLivello[0].value;
        ascissaMassimaLivello = bordiLivello[2].value;

        if (this._regioneLivello == this.REGIONE_SINISTRA) {
		    livello.translate(margine - ascissaMinimaLivello, 0);
	    } else if (this._regioneLivello == this.REGIONE_DESTRA) {
            livello.translate(larghezzaDocumento - margine - ascissaMassimaLivello, 0);
	    } else if (this._regioneLivello == this.REGIONE_CENTRALE) {
            livello.translate((larghezzaDocumento - ascissaMinimaLivello - ascissaMassimaLivello) / 2, 0);
	    }

    };

    this.leggiRegioneLivello() {
        return _regioneLivello;
    };

}
