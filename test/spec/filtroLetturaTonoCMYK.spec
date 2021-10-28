//@include "../../source/gestione-io/ScrittoreTabellaToni.jsx"
//@include "../../source/tonalizzazione/TabellaToniCMYK.jsx"
//@include "../../source/tonalizzazione/FiltroLetturaTonoCMYK.jsx"

if (app.documents.length == 0) {
    throw new Error(
        "Nessun documento aperto in Photoshop!" +
        "Aprire i documenti salvati in ./test/docs/FiltroLetturaTonoCMYK e riprovare!"
    );
}

var filtroLetturaTono = new FiltroLetturaTonoCMYK(
    new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard()), 
    new ScrittoreTabellaToni()
);

var docsCreati = [];
var docModeList = [];

for (var i = 0; i < 12; i++) {
    var cn = Math.floor(Math.random() * 100);
    var docMode = Math.floor(Math.random() * 7);
    var docModeName;

    if (docMode == 0) {
        docMode = NewDocumentMode.BITMAP;
        docModeList.push(DocumentMode.BITMAP);
        docModeName = "BITMAP";
    } else if (docMode == 1) {
        docMode = NewDocumentMode.GRAYSCALE;
        docModeList.push(DocumentMode.GRAYSCALE);
        docModeName = "GRAYSCALE";
    } else if (docMode == 2) {
        docMode = NewDocumentMode.LAB;
        docModeList.push(DocumentMode.LAB);
        docModeName = "LAB";
    } else if (docMode == 3) {
        docMode = NewDocumentMode.RGB;
        docModeList.push(DocumentMode.RGB);
        docModeName = "RGB";
    } else {
        docMode = NewDocumentMode.CMYK;
        docModeList.push(DocumentMode.CMYK);
        docModeName = "CMYK";
    }

    var docname = (cn < 10) ? "0" : "";
    docname = docname.concat(cn).concat("_TEST_LETTURA_35X35_").concat(docModeName).concat(".tif");
    docsCreati.push(app.documents.add(35, 35, 200, docname, docMode));
    $.writeln("Creato documento " + docModeName + " di nome '" + docname);
}

describe("Il metodo settaTabellaToni(tabellaToni) di FiltroLetturaTonoCMYK", function() {
    it("\n\tdeve lanciare un errore se tabellaToni è null", function() {
        expect(function() {
            filtroLetturaTono.settaTabellaToni(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se tabellaToni è undefined", function() {
        expect(function() {
            filtroLetturaTono.settaTabellaToni(undefined);
        }).toThrowError();
    });
});

describe("Il metodo settaScrittoreTabellaToni(scrittoreTabellaToni) di FiltroLetturaTonoCMYK", function() {
    it("\n\tdeve lanciare un errore se scrittoreTabellaToni è null", function() {
        expect(function() {
            filtroLetturaTono.settaScrittoreTabellaToni(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se scrittoreTabellaToni è undefined", function() {
        expect(function() {
            filtroLetturaTono.settaScrittoreTabellaToni(undefined);
        }).toThrowError();
    });
});

describe("Il metodo validaDocumenti(documenti) di FiltroLetturaTonoCMYK", function() {
    it("\n\tdeve ritornare un array contenente i nomi dei documenti non validi (cioè con metodo colore diverso da CMYK)", function() {
        expect(filtroLetturaTono.validaDocumenti([]).length).toEqual(0);
        $.writeln("Verifica documenti non validi tra quelli creati:");
        $.writeln(filtroLetturaTono.validaDocumenti(docsCreati));
    });
});

describe("Il metodo settaDocumenti(documenti) di FiltroLetturaTonoCMYK", function() {
    it("\n\tdeve lanciare un errore se documenti è null", function() {
        expect(function() {
            filtroLetturaTono.settaDocumenti(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se documenti è undefined", function() {
        expect(function() {
            filtroLetturaTono.settaDocumenti(undefined);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore e visualizzare i documenti non validi, se sono presenti documenti non CMYK, altrimenti settare i documenti", function() {
        var docsToTest = [];
        var throwError = 0;

        for (var i = 0; i < 8; i++) {
            var ix = Math.floor(Math.random() * docsCreati.length);
            
            if (docModeList[ix] != DocumentMode.CMYK) {
                throwError++;
            }

            docsToTest.push(docsCreati[ix]);
        }

        $.writeln("docsToTest di settaDocumenti:");
        $.writeln(docsToTest);

        if (throwError > 0) {
            expect(function() {
                filtroLetturaTono.settaDocumenti(docsToTest);
            }).toThrowError();
        } else {
            expect(filtroLetturaTono._documenti).toEqual(docsToTest);
        }
    });

    it("\n\tdeve settare i documenti se tutti i documenti sono validi", function() {
        var docsValidi = [];

        for (var k = 0; k < docsCreati.length; k++) {
            if (docModeList[k] == DocumentMode.CMYK) {
                docsValidi.push(docsCreati[k]);
            }
        }

        $.writeln("docsValidi:");
        $.writeln(docsValidi);
        filtroLetturaTono.settaDocumenti(docsValidi);
        expect(filtroLetturaTono._documenti).toEqual(docsValidi);
    });
});

describe("Il metodo validaTono(tono) di FiltroLetturaTonoCMYK", function() {
    var toniNonValidi = [null, undefined];
    var toniValidi = [];

    toniNonValidi.push(new SolidColor);
    toniNonValidi[toniNonValidi.length - 1].cmyk.cyan = 0;
    toniNonValidi[toniNonValidi.length - 1].cmyk.magenta = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.yellow = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.black = Math.floor(Math.random() * 100 + 1);

    toniNonValidi.push(new SolidColor);
    toniNonValidi[toniNonValidi.length - 1].cmyk.cyan = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.magenta = 0
    toniNonValidi[toniNonValidi.length - 1].cmyk.yellow = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.black = Math.floor(Math.random() * 100 + 1);

    toniNonValidi.push(new SolidColor);
    toniNonValidi[toniNonValidi.length - 1].cmyk.cyan = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.magenta = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.yellow = 0
    toniNonValidi[toniNonValidi.length - 1].cmyk.black = Math.floor(Math.random() * 100 + 1);

    toniNonValidi.push(new SolidColor);
    toniNonValidi[toniNonValidi.length - 1].cmyk.cyan = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.magenta = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.yellow = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.black = 0

    toniNonValidi.push(new SolidColor);
    toniNonValidi[toniNonValidi.length - 1].cmyk.cyan = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.magenta = 0
    toniNonValidi[toniNonValidi.length - 1].cmyk.yellow = Math.floor(Math.random() * 100 + 1);
    toniNonValidi[toniNonValidi.length - 1].cmyk.black = 0

    toniNonValidi.push(new SolidColor);
    toniNonValidi[toniNonValidi.length - 1].cmyk.cyan = 0
    toniNonValidi[toniNonValidi.length - 1].cmyk.magenta = 0
    toniNonValidi[toniNonValidi.length - 1].cmyk.yellow = 0
    toniNonValidi[toniNonValidi.length - 1].cmyk.black = 0

    for (var i = 0; i < 15; i++) {
        toniValidi.push(new SolidColor);
        toniValidi[i].cmyk.cyan = Math.floor(Math.random() * 101);
        toniValidi[i].cmyk.magenta = Math.floor(Math.random() * 101);
        toniValidi[i].cmyk.yellow = Math.floor(Math.random() * 101);
        toniValidi[i].cmyk.black = Math.floor(Math.random() * 101);
    }

    it("\n\tdeve ritornare false se tono non è valido", function() {
        for (var k = 0; k < toniNonValidi.length; k++) {
            expect(filtroLetturaTono.validaTono(toniNonValidi[k])).toEqual(false);
        }
    });

    it("\n\tdeve ritornare true se tono è valido", function() {
        for (var k = 0; k < toniValidi.length; k++) {
            expect(filtroLetturaTono.validaTono(toniValidi[k])).toEqual(true);
        }
    });
});

describe("Il metodo _compilaTabellaToni() di FiltroLetturaTonoCMYK", function() {
    it("\n\tdeve compilare la tabella dei toni, e inserire in _documentiConTonoNonValido i nomi dei documenti con tono non valido", function() {
        var docs = [];

        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name.match("_35X35_") == null) {
                docs.push(app.documents[i]);
            }
        }

        $.writeln("Documenti usati per test compilazione tabella toni:");
        $.writeln(docs);

        filtroLetturaTono.settaDocumenti(docs);
        filtroLetturaTono._compilaTabellaToni();
        expect(filtroLetturaTono._documentiConTonoNonValido.length).toEqual(2);
        $.writeln("Verificare che di seguito siano riportati i documenti non validi '08_TEST_LETTURA.jpg' e '15_TEST_LETTURA.jpg':");
        $.writeln(filtroLetturaTono._documentiConTonoNonValido);
        $.writeln("Verificare che la tabella dei toni sia corretta:");
        $.writeln(filtroLetturaTono._tabellaToni.toString());
    });
});

describe("Il metodo esegui(documenti) di FiltroLetturaTonoCMYK", function() {
    it("\n\tdeve abortire l'esecuzione - mostrando una finestra di dialogo - se ci sono documenti non validi", function() {
       filtroLetturaTono.esegui(app.documents);
    });

    it("\n\tdeve compilare la tabella dei toni, visualizzarla a schermo e salvarla su file se NON ci sono documenti non validi", function() {
        var docs = [];

        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name.match("_35X35_") == null) {
                docs.push(app.documents[i]);
            }
        }

        filtroLetturaTono.settaTabellaToni(new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard()));
        filtroLetturaTono.esegui(docs);
     });
});

