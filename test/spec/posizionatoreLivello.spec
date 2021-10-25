//@include "../../source/posizionamento-livello/PosizionatoreLivello.jsx"

if (app.documents.length == 0) {
    throw new Error(
        "Nessun documento aperto in Photoshop!" +
        "Aprire i documenti salvati in ./test/docs/PosizionatoreLivello e riprovare!"
    );
}

var documento = app.documents.add(35, 35, 300, "99_test_posizionamento.tiff", NewDocumentMode.CMYK);
var livello = documento.artLayers.add();
var posizionatoreLivello = new PosizionatoreLivello(4);

app.activeDocument = documento;
documento.activeLayer = livello;
livello.kind = LayerKind.TEXT;
livello.textItem.contents = "TEST-POSIZIONAMENTO";
livello.textItem.size = new UnitValue(36, 'pt');

describe("Il metodo settaLivello(livello) di PosizionatoreLivello", function() {
    it("deve lanciare un errore se l'argomento livello è null", function() {
        expect(function() {
            posizionatoreLivello.settaLivello(null);
        }).toThrowError(Error);
    });

    it("deve lanciare un errore se l'argomento livello è undefined", function() {
        expect(function() {
            posizionatoreLivello.settaLivello(undefined);
        }).toThrowError(Error);
    });

    it("deve impostare livello come attributo di PosizionatoreLivello se è un livello valido", function() {
        posizionatoreLivello.settaLivello(livello);
        expect(posizionatoreLivello._livello).toEqual(livello);
    });
});

describe("Il metodo settaMargine(margine) di PosizionatoreLivello", function() {
    it("deve lanciare un errore se l'argomento margine è negativo", function() {
        expect(function() {
            posizionatoreLivello.settaMargine(Number.MAX_VALUE * -1);
        }).toThrowError(Error);

        expect(function() {
            posizionatoreLivello.settaMargine(-1);
        }).toThrowError(Error);

        expect(function() {
            posizionatoreLivello.settaMargine(-22.5);
        }).toThrowError(Error);
    
        expect(function() {
            posizionatoreLivello.settaMargine(String(Number.MAX_VALUE * -1));
        }).toThrowError(Error);
    
        expect(function() {
            posizionatoreLivello.settaMargine("-1");
        }).toThrowError(Error);
    
        expect(function() {
            posizionatoreLivello.settaMargine("-22.5");
        }).toThrowError(Error);
    });
    
    it("deve impostare margine come attributo di PosizionatoreLivello se margine >= 0", function() {
        var listaMargini = [0, 1, 17.8, Number.MAX_VALUE - 1, Number.MAX_VALUE];

        for (var i = 0; i < listaMargini.length; i++) {
            posizionatoreLivello.settaMargine(listaMargini[i]);
            expect(posizionatoreLivello._margine).toEqual(listaMargini[i]);
            posizionatoreLivello.settaMargine(String(listaMargini[i]));
            expect(posizionatoreLivello._margine).toEqual(listaMargini[i]);
        }
    });
});

describe("Il metodo rilevaRegione(livello) di PosizionatoreLivello", function() {
    posizionatoreLivello = new PosizionatoreLivello(4);

    it("deve settare l'attributo _livello a livello", function() {
        posizionatoreLivello.rilevaRegione(livello);
        expect(posizionatoreLivello._livello).toEqual(livello);
    });

    it("deve settare l'attributo _regioneLivello a _REGIONE_SINISTRA quando livello è spostato verso sinistra", function() {
        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name.match("_SINISTRA.psd") == null || app.documents[i].name == documento.name) {
                continue;
            }

            app.activeDocument = app.documents[i];
            app.activeDocument.activeLayer = app.activeDocument.artLayers[0];
            posizionatoreLivello.rilevaRegione(app.activeDocument.activeLayer);
            expect(posizionatoreLivello._regioneLivello).toEqual(posizionatoreLivello._REGIONE_SINISTRA);
        }
    });

    it("deve settare l'attributo _regioneLivello a _REGIONE_CENTRALE quando livello è spostato verso il centro", function() {
        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name.match("_CENTRALE.psd") == null || app.documents[i].name == documento.name) {
                continue;
            }

            app.activeDocument = app.documents[i];
            app.activeDocument.activeLayer = app.activeDocument.artLayers[0];
            posizionatoreLivello.rilevaRegione(app.activeDocument.activeLayer);
            expect(posizionatoreLivello._regioneLivello).toEqual(posizionatoreLivello._REGIONE_CENTRALE);
        }
    });

    it("deve settare l'attributo _regioneLivello a _REGIONE_DESTRA quando livello è spostato verso destra", function() {
        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name.match("_DESTRA.psd") == null || app.documents[i].name == documento.name) {
                continue;
            }

            app.activeDocument = app.documents[i];
            app.activeDocument.activeLayer = app.activeDocument.artLayers[0];
            posizionatoreLivello.rilevaRegione(app.activeDocument.activeLayer);
            expect(posizionatoreLivello._regioneLivello).toEqual(posizionatoreLivello._REGIONE_DESTRA);
        }
    });
});

describe("Il metodo riposizionaLivello() di PosizionatoreLivello", function() {
    var distanzaBordoSinistro;
    var distanzaBordoSuperiore;
    var distanzaBordoDestro;
    posizionatoreLivello = new PosizionatoreLivello(4);
    
    it("deve riposizionare _livello secondo _regioneLivello lasciando un margine pari a _margine se _margine <= margineMax", function() {
        var margine;
        var marginiPerRegioneSinistra = [0, 0.35, 4];
        var marginiPerRegioneDestra = [5.50, 6.75, 7];

        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name == documento.name) {
                continue;
            }

            if (app.documents[i].name.match("_SINISTRA.psd") != null) {
                margine = marginiPerRegioneSinistra.pop();
                posizionatoreLivello.settaMargine(margine);
                app.activeDocument = app.documents[i];
                app.activeDocument.activeLayer = app.activeDocument.artLayers[0];
                posizionatoreLivello.rilevaRegione(app.activeDocument.activeLayer);
                posizionatoreLivello.riposizionaLivello();
                distanzaBordoSinistro = app.activeDocument.activeLayer.bounds[0].value;
                distanzaBordoSuperiore = app.activeDocument.activeLayer.bounds[1].value;
                expect(Math.abs(distanzaBordoSinistro - margine).toFixed(1) <= 0.1).toBe(true);
                expect(Math.abs(distanzaBordoSuperiore - margine).toFixed(1) <= 0.1).toBe(true);
            }

            if (app.documents[i].name.match("_DESTRA.psd") != null) {
                margine = marginiPerRegioneDestra.pop();
                posizionatoreLivello.settaMargine(margine);
                app.activeDocument = app.documents[i];
                app.activeDocument.activeLayer = app.activeDocument.artLayers[0];
                posizionatoreLivello.rilevaRegione(app.activeDocument.activeLayer);
                posizionatoreLivello.riposizionaLivello();
                distanzaBordoSuperiore = app.activeDocument.activeLayer.bounds[1].value;
                distanzaBordoDestro = app.activeDocument.width.value - app.activeDocument.activeLayer.bounds[2].value;
                expect(Math.abs(distanzaBordoSuperiore - margine).toFixed(1) <= 0.1).toBe(true);
                expect(Math.abs(distanzaBordoDestro - margine).toFixed(1) <= 0.1).toBe(true);
            }
        }
    });
    
    it("deve riposizionare _livello secondo _regioneLivello lasciando un margine pari margineMax se _margine > margineMax", function() {
        var margine;
        var margineMax;
        var marginiPerRegioneCentrale = [7.20, 28.63, Number.MAX_VALUE];
        
        for (var i = 0; i < app.documents.length; i++) {
            if (app.documents[i].name == documento.name) {
                continue;
            }

            if (app.documents[i].name.match("_CENTRALE.psd") != null) {
                margine = marginiPerRegioneCentrale.pop();
                margineMax = 0.20 * Math.min(app.activeDocument.width.value, app.activeDocument.height.value);
                posizionatoreLivello.settaMargine(margine);
                app.activeDocument = app.documents[i];
                app.activeDocument.activeLayer = app.activeDocument.artLayers[0];
                posizionatoreLivello.rilevaRegione(app.activeDocument.activeLayer);
                posizionatoreLivello.riposizionaLivello();
                distanzaBordoSinistro = app.activeDocument.activeLayer.bounds[0].value;
                distanzaBordoSuperiore = app.activeDocument.activeLayer.bounds[1].value;
                distanzaBordoDestro = app.activeDocument.width.value - app.activeDocument.activeLayer.bounds[2].value;
                expect(Math.abs(distanzaBordoSinistro - distanzaBordoDestro).toFixed(1) <= 0.1).toBe(true);
                expect(Math.abs(distanzaBordoSuperiore - margineMax).toFixed(1) <= 0.1).toBe(true);
            }
        }
    });
});