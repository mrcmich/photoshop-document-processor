//@include "../../source/gestione-io/ScrittoreTabellaToni.jsx"
//@include "../../source/tonalizzazione/TabellaToniCMYK.jsx"
//@include "../../source/tonalizzazione/FiltroLetturaTonoCMYK.jsx"

var filtroLetturaTono = new FiltroLetturaTonoCMYK(
    new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard()), 
    new ScrittoreTabellaToni()
);

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
    app.documents.add(35, 35, 200, docname, docMode);
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
        var docsToTest = [];

        expect(filtroLetturaTono.validaDocumenti([]).length).toEqual(0);

        for (var j = 0; j < app.documents.length; j++) {
            docsToTest.push(app.documents[j]);
            $.writeln("Verifica che quelli che seguono siano tutti e soli i documenti non CMYK nei primi " + (j + 1) + " documenti creati:");
            $.writeln(filtroLetturaTono.validaDocumenti(docsToTest));
        }
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
            var ix = Math.floor(Math.random() * app.documents.length);
            
            if (docModeList[ix] != DocumentMode.CMYK) {
                throwError++;
            }

            docsToTest.push(app.documents[ix]);
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

        for (var k = 0; k < app.documents.length; k++) {
            if (docModeList[k] == DocumentMode.CMYK) {
                docsValidi.push(app.documents[k]);
            }
        }

        $.writeln("docsValidi:");
        $.writeln(docsValidi);
        filtroLetturaTono.settaDocumenti(docsValidi);
        expect(filtroLetturaTono._documenti).toEqual(docsValidi);
    });
});

describe("Il metodo rilevaTono(livello, campionatoreColore) di FiltroLetturaTonoCMYK", function() {

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

});

describe("Il metodo esegui(documenti) di FiltroLetturaTonoCMYK", function() {

});

