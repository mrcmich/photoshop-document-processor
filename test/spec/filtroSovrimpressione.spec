//@include "../../source/sovrimpressione-info/FiltroSovrimpressione.jsx"

if (app.documents.length == 0) {
    throw new Error(
        "Nessun documento aperto in Photoshop!" +
        "Aprire i documenti salvati in ./test/docs/FiltroSovrimpressione e riprovare!"
    );
}

var conf = {
    azioneConfigurazione: "FILES NUMERATI",
    setAzioneConfigurazione: "NUMERAZIONE",
};

var filtroSovrimpressione = new FiltroSovrimpressione(conf, new EstrattoreNomeStandard(), new PosizionatoreLivello(4));

describe("Il metodo settaAzioneConfigurazione(parametriConfigurazione) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se parametriConfigurazione non ha una chiave azioneConfigurazione", function() {
       expect(function() {
            filtroSovrimpressione.settaAzioneConfigurazione({  });
       }).toThrowError();
    });
});

describe("Il metodo settaAzioneConfigurazione(parametriConfigurazione) di FiltroSovrimpressione", function() {
    it("deve impostare _azioneConfigurazione = parametriConfigurazione.azioneConfigurazione se parametriConfigurazione ha una chiave azioneConfigurazione", function() {
        filtroSovrimpressione.settaAzioneConfigurazione({ azioneConfigurazione: "azione" });
        expect(filtroSovrimpressione._azioneConfigurazione).toEqual("azione");
    });
});

describe("Il metodo settaSetAzioneConfigurazione(parametriConfigurazione) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se parametriConfigurazione non ha una chiave setAzioneConfigurazione", function() {
       expect(function() {
            filtroSovrimpressione.settaAzioneConfigurazione({  });
       }).toThrowError();
    });
});

describe("Il metodo settaSetAzioneConfigurazione(parametriConfigurazione) di FiltroSovrimpressione", function() {
    it("deve impostare _setAzioneConfigurazione = parametriConfigurazione.setAzioneConfigurazione se parametriConfigurazione ha una chiave setAzioneConfigurazione", function() {
        filtroSovrimpressione.settaSetAzioneConfigurazione({ setAzioneConfigurazione: "set" });
        expect(filtroSovrimpressione._setAzioneConfigurazione).toEqual("set");
    });
});

describe("Il metodo settaEstrattoreInfo(estrattoreInfo) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se estrattoreInfo è null", function() {
        expect(function() {
            filtroSovrimpressione.settaEstrattoreInfo(null);
       }).toThrowError();
    });
});

describe("Il metodo settaEstrattoreInfo(estrattoreInfo) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se estrattoreInfo è undefined", function() {
        expect(function() {
            filtroSovrimpressione.settaEstrattoreInfo(undefined);
       }).toThrowError();
    });
});

describe("Il metodo settaPosizionatoreLivello(posizionatoreLivello) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se posizionatoreLivello è null", function() {
        expect(function() {
            filtroSovrimpressione.settaPosizionatoreLivello(null);
       }).toThrowError();
    });
});

describe("Il metodo settaPosizionatoreLivello(posizionatoreLivello) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se posizionatoreLivello è undefined", function() {
        expect(function() {
            filtroSovrimpressione.settaPosizionatoreLivello(undefined);
       }).toThrowError();
    });
});

describe("Il metodo esegui(documenti) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se documenti è null", function() {
        expect(function() {
            filtroSovrimpressione.esegui(null);
       }).toThrowError();
    });
});

describe("Il metodo esegui(documenti) di FiltroSovrimpressione", function() {
    it("deve lanciare un errore se documenti è undefined", function() {
        expect(function() {
            filtroSovrimpressione.esegui(undefined);
       }).toThrowError();
    });
});

describe("Il metodo esegui(documenti) di FiltroSovrimpressione", function() {
    it("deve terminare correttamente se documenti è un array vuoto", function() {
        filtroSovrimpressione.esegui([]);
    });
});

describe("Il metodo esegui(documenti) di FiltroSovrimpressione deve aprire una finestra di dialogo di errore se non è possibile trovare l'azione di configurazione", function() {
    it(" - azione e set stringhe valide non vuote", function() {
        var confInvalida = { azioneConfigurazione: "AZIONE", setAzioneConfigurazione: "SET" };
        filtroSovrimpressione.settaAzioneConfigurazione(confInvalida);
        filtroSovrimpressione.settaSetAzioneConfigurazione(confInvalida);
        filtroSovrimpressione.esegui(app.documents);
    });

    it(" - azione e set null/undefined", function() {
        var confInvalida = { azioneConfigurazione: null, setAzioneConfigurazione: undefined };
        filtroSovrimpressione.settaAzioneConfigurazione(confInvalida);
        filtroSovrimpressione.settaSetAzioneConfigurazione(confInvalida);
        filtroSovrimpressione.esegui(app.documents);
    });

    it(" - azione e set stringhe valide vuote", function() {
        var confInvalida = { azioneConfigurazione: "", setAzioneConfigurazione: "" };
        filtroSovrimpressione.settaAzioneConfigurazione(confInvalida);
        filtroSovrimpressione.settaSetAzioneConfigurazione(confInvalida);
        filtroSovrimpressione.esegui(app.documents);
    });
});

describe("Il metodo esegui(documenti) di FiltroSovrimpressione", function() {
    it("deve aprire una finestra di dialogo di errore e resettare i documenti se in uno dei documenti non è possibile trovare alcun campo di testo", function() {
        var confErrata = { azioneConfigurazione: "Duplica livello", setAzioneConfigurazione: "Set 1" };
        filtroSovrimpressione.settaAzioneConfigurazione(confErrata);
        filtroSovrimpressione.settaSetAzioneConfigurazione(confErrata);
        filtroSovrimpressione.esegui(app.documents);
    });
});

var indiciSinistra = { "01": 1, "04": 4, "07": 7 };
var indiciCentrale = { "02": 2, "05": 5, "08": 8 };
var indiciDestra = { "03": 3, "06": 6 };

var confSinistra = {
        azioneConfigurazione: "SINISTRA",
        setAzioneConfigurazione: "SOVRIMPRESSIONE",
};

var confCentrale = {
    azioneConfigurazione: "CENTRALE",
    setAzioneConfigurazione: "SOVRIMPRESSIONE",
};

var confDestra = {
    azioneConfigurazione: "DESTRA",
    setAzioneConfigurazione: "SOVRIMPRESSIONE",
};

describe("Il metodo esegui(documenti) di FiltroSovrimpressione", function() {
    it("deve sovrimprimere correttamente il nome e il codice numerico di ciascun documento su di esso, lasciando un margine di 4 cm nel primo caso e di 2 cm nel secondo", function() {
        var documentiSinistra = [];
        var documentiCentrale = [];
        var documentiDestra = [];

        var sovrimpressioneNome = new FiltroSovrimpressione(confSinistra, new EstrattoreNomeStandard(), new PosizionatoreLivello(4));
        var sovrimpressioneCodiceNumerico = new FiltroSovrimpressione(confSinistra, new EstrattoreCodiceNumericoStandard(), new PosizionatoreLivello(2));
        
        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name.substr(0, 2) in indiciSinistra) {
                documentiSinistra.push(app.documents[i]);
            } else if (app.documents[i].name.substr(0, 2) in indiciCentrale) {
                documentiCentrale.push(app.documents[i]);
            } else if (app.documents[i].name.substr(0, 2) in indiciDestra) {
                documentiDestra.push(app.documents[i]);
            }
        }
        
        expect(function() {
            sovrimpressioneNome.esegui(documentiSinistra);
            sovrimpressioneCodiceNumerico.esegui(documentiSinistra);
        }).not.toThrowError();
        
        sovrimpressioneNome.settaAzioneConfigurazione(confCentrale);
        sovrimpressioneCodiceNumerico.settaAzioneConfigurazione(confCentrale);

        expect(function() {
            sovrimpressioneNome.esegui(documentiCentrale);
            sovrimpressioneCodiceNumerico.esegui(documentiCentrale);
        }).not.toThrowError();

        sovrimpressioneNome.settaAzioneConfigurazione(confDestra);
        sovrimpressioneCodiceNumerico.settaAzioneConfigurazione(confDestra);

        expect(function() {
            sovrimpressioneNome.esegui(documentiDestra);
            sovrimpressioneCodiceNumerico.esegui(documentiDestra);
        }).not.toThrowError();
    });
});
