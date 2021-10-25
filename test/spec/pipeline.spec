//@include "../../source/oggetti-minimi/Pipeline.jsx"
//@include "../../source/oggetti-minimi/FiltroAstratto.jsx"

function FiltroVuoto(indice) {
    this.__proto__ = FiltroAstratto;
    this._nome = "FiltroVuoto" + indice;

    this.leggiNome = function() {
        return this._nome;
    };

    this.esegui = function(documenti) {
        $.writeln("Eseguito " + this._nome);
    };
}

var pipeline = new Pipeline(app.documents);

describe("Il metodo settaDocumenti(documenti) di Pipeline", function() {
    it("\n\tdeve lanciare un errore se l'argomento documenti è null", function() {
        expect(function() {
            pipeline.settaDocumenti(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se l'argomento documenti è undefined", function() {
        expect(function() {
            pipeline.settaDocumenti(undefined);
        }).toThrowError();
    });
});

describe("Il metodo aggiungiFiltro(filtro) di Pipeline", function() {
    it("\n\tdeve lanciare un errore se l'argomento filtro è null", function() {
        expect(function() {
            pipeline.aggiungiFiltro(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se l'argomento filtro è undefined", function() {
        expect(function() {
            pipeline.aggiungiFiltro(undefined);
        }).toThrowError();
    });

    it("\n\tdeve aggiungere filtro a _filtri se filtro non è null o undefined", function() {
        for (var i = 0; i < 100; i++) {
            pipeline.aggiungiFiltro(new FiltroVuoto(i));

            expect(pipeline._filtri[i]._nome).toEqual("FiltroVuoto" + i);
            expect(pipeline._filtri.length).toEqual(i + 1);
        }
    });
});

describe("Il metodo rimuoviFiltro(indiceFiltro) di Pipeline", function() {
    it("\n\tdeve lanciare un errore se l'argomento indiceFiltro è null", function() {
        expect(function() {
            pipeline.rimuoviFiltro(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se l'argomento indiceFiltro è undefined", function() {
        expect(function() {
            pipeline.rimuoviFiltro(undefined);
        }).toThrowError();
    });

    it("\n\tdeve lasciare inalterato _filtri se indiceFiltro è < 0 o >= _filtri.length", function() {
        var indici = [Number.MAX_VALUE * -1, -1, 100, 101, Number.MAX_VALUE, -23, 231];

        for (var i = 0; i < indici.length; i++) {
            pipeline.rimuoviFiltro(indici[i]);
        }

        expect(pipeline._filtri.length).toEqual(100);
    });

    it("\n\tdeve eliminare il filtro di indice indiceFiltro se indiceFiltro è un indice valido", function() {
        var indici = [99, 98, 67, 50, 22, 1, 0];

        for (var i = 0; i < indici.length; i++) {
            pipeline.rimuoviFiltro(indici[i]);
        }

        expect(pipeline._filtri.length).toEqual(100 - indici.length);

        // reset pipeline
        pipeline._filtri.length = 0;
        for (var i = 0; i < 100; i++) {
            pipeline.aggiungiFiltro(new FiltroVuoto(i));
        }

        for (var i = 0; i < indici.length; i++) {
            pipeline.rimuoviFiltro(String(indici[i]));
        } 

        expect(pipeline._filtri.length).toEqual(100 - indici.length);
    });
});

describe("Il metodo elencoFiltri() di Pipeline", function() {
    it("\n\tdeve restituire l'elenco dei filtri della pipeline", function() {
        pipeline._filtri.length = 0;

        expect(pipeline.elencoFiltri()).toEqual("{ }");

        pipeline.aggiungiFiltro(new FiltroVuoto(0));
        expect(pipeline.elencoFiltri()).toEqual("{ 0: FiltroVuoto0 }");

        for (var i = 1; i < 30; i++) {
            pipeline.aggiungiFiltro(new FiltroVuoto(i));
        }

        expect(pipeline.elencoFiltri()).toEqual("{ 0: FiltroVuoto0, 1: FiltroVuoto1, 2: FiltroVuoto2, 3: FiltroVuoto3, 4: FiltroVuoto4, 5: FiltroVuoto5, 6: FiltroVuoto6, 7: FiltroVuoto7, 8: FiltroVuoto8, 9: FiltroVuoto9, 10: FiltroVuoto10, 11: FiltroVuoto11, 12: FiltroVuoto12, 13: FiltroVuoto13, 14: FiltroVuoto14, 15: FiltroVuoto15, 16: FiltroVuoto16, 17: FiltroVuoto17, 18: FiltroVuoto18, 19: FiltroVuoto19, 20: FiltroVuoto20, 21: FiltroVuoto21, 22: FiltroVuoto22, 23: FiltroVuoto23, 24: FiltroVuoto24, 25: FiltroVuoto25, 26: FiltroVuoto26, 27: FiltroVuoto27, 28: FiltroVuoto28, 29: FiltroVuoto29 }");
    });
});

describe("Il metodo svuota() di Pipeline", function() {
    it("\n\tdeve svuotare _filtri", function() {
        pipeline.svuota();
        expect(pipeline._filtri.length).toEqual(0);
        expect(pipeline.elencoFiltri()).toEqual("{ }");
    });
});

describe("Il metodo esegui() di Pipeline", function() {
    it("\n\tdeve usare i filtri di cui si compone per processare i documenti aperti", function() {
        for (var i = 0; i < 15; i++) {
            pipeline.aggiungiFiltro(new FiltroVuoto(i + 1));
        }

        $.writeln("Verifica che siano eseguiti tutti i filtri, da FiltroVuoto1 a FiltroVuoto15:");
        pipeline.esegui();
    });
});

describe("Il metodo concatena(pipeline) di Pipeline", function() {
    it("\n\tdeve lanciare un errore se l'argomento pipeline è null", function() {
        expect(function() {
            pipeline.concatena(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se l'argomento pipeline è undefined", function() {
        expect(function() {
            pipeline.concatena(undefined);
        }).toThrowError();
    });

    it("\n\tdeve aggiungere alla pipeline su cui è invocato tutti i filtri dell'argomento pipeline", function() {
        pipeline1 = new Pipeline(app.documents);
        pipeline2 = new Pipeline(app.documents);

        for (var i = 16; i <= 30; i++) {
            pipeline2.aggiungiFiltro(new FiltroVuoto(i));
        }

        pipeline.concatena(pipeline1);
        expect(pipeline._filtri.length).toEqual(15);

        pipeline.concatena(pipeline2);
        expect(pipeline._filtri.length).toEqual(30);
        $.writeln("Verifica che siano eseguiti tutti i filtri, da FiltroVuoto1 a FiltroVuoto30:");
        pipeline.esegui();

        pipeline1.concatena(pipeline).concatena(pipeline2);
        expect(pipeline1._filtri.length).toEqual(45);
    });
});

