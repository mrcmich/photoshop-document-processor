//@include "../../source/estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"
//@include "../../source/tonalizzazione/TabellaToniCMYK.jsx"

var tabellaToni = new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard());
var toni = new Array(10);

        for (var i = 0; i < toni.length; i++) {
            toni[i] = new SolidColor();
            toni[i].cmyk.cyan = Math.floor(Math.random() * 101);
            toni[i].cmyk.magenta = Math.floor(Math.random() * 101);
            toni[i].cmyk.yellow = Math.floor(Math.random() * 101);
            toni[i].cmyk.black = Math.floor(Math.random() * 101);
        }

        app.documents.add(35, 35, 200, "00_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "05_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "03_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "08_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "02_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "01_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "11_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "09_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "13_test_35X35.tiff", NewDocumentMode.CMYK);
        app.documents.add(35, 35, 200, "15_test_35X35.tiff", NewDocumentMode.CMYK);

describe("Il metodo settaEstrattoreCodiceNumerico(estrattoreCodiceNumerico) di TabellaToniCMYK", function() {
    it("\n\tdeve lanciare un errore se estrattoreCodiceNumerico è null", function() {
        expect(function() {
            tabellaToni.settaEstrattoreCodiceNumerico(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se estrattoreCodiceNumerico è undefined", function() {
        expect(function() {
            tabellaToni.settaEstrattoreCodiceNumerico(undefined);
        }).toThrowError();
    });
});

describe("Il metodo aggiungiTono(documento, tono) di TabellaToniCMYK", function() {
    it("\n\tdeve lanciare un errore se documento è null", function() {
        expect(function() {
            tabellaToni.aggiungiTono(null, toni[0]);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se documento è undefined", function() {
        expect(function() {
            tabellaToni.aggiungiTono(undefined, toni[0]);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se tono è null", function() {
        expect(function() {
            tabellaToni.aggiungiTono(app.documents[0], null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se tono è undefined", function() {
        expect(function() {
            tabellaToni.aggiungiTono(app.documents[0], undefined);
        }).toThrowError();
    });

    it("\n\tdeve aggiungere un nuovo tono a _toni se documento e tono sono entrambi non null/undefined", function() {
        for (var i = 0; i < app.documents.length; i++) {
            tabellaToni.aggiungiTono(app.documents[i], toni[i]);
            $.writeln(
                "Aggiunto tono " + "[" + 
                toni[i].cmyk.cyan + "," + 
                toni[i].cmyk.magenta + "," + 
                toni[i].cmyk.yellow + "," + 
                toni[i].cmyk.black + 
                "]" + " di documento " + app.documents[i].name
            );
        }

        expect(tabellaToni._toni[0].id).toEqual(0);
        expect(tabellaToni._toni[0].tono.cmyk.cyan).toEqual(toni[0].cmyk.cyan);
        expect(tabellaToni._toni[0].tono.cmyk.magenta).toEqual(toni[0].cmyk.magenta);
        expect(tabellaToni._toni[0].tono.cmyk.yellow).toEqual(toni[0].cmyk.yellow);
        expect(tabellaToni._toni[0].tono.cmyk.black).toEqual(toni[0].cmyk.black);

        expect(tabellaToni._toni[1].id).toEqual(1);
        expect(tabellaToni._toni[1].tono.cmyk.cyan).toEqual(toni[5].cmyk.cyan);
        expect(tabellaToni._toni[1].tono.cmyk.magenta).toEqual(toni[5].cmyk.magenta);
        expect(tabellaToni._toni[1].tono.cmyk.yellow).toEqual(toni[5].cmyk.yellow);
        expect(tabellaToni._toni[1].tono.cmyk.black).toEqual(toni[5].cmyk.black);

        expect(tabellaToni._toni[2].id).toEqual(2);
        expect(tabellaToni._toni[2].tono.cmyk.cyan).toEqual(toni[4].cmyk.cyan);
        expect(tabellaToni._toni[2].tono.cmyk.magenta).toEqual(toni[4].cmyk.magenta);
        expect(tabellaToni._toni[2].tono.cmyk.yellow).toEqual(toni[4].cmyk.yellow);
        expect(tabellaToni._toni[2].tono.cmyk.black).toEqual(toni[4].cmyk.black);

        expect(tabellaToni._toni[3].id).toEqual(3);
        expect(tabellaToni._toni[3].tono.cmyk.cyan).toEqual(toni[2].cmyk.cyan);
        expect(tabellaToni._toni[3].tono.cmyk.magenta).toEqual(toni[2].cmyk.magenta);
        expect(tabellaToni._toni[3].tono.cmyk.yellow).toEqual(toni[2].cmyk.yellow);
        expect(tabellaToni._toni[3].tono.cmyk.black).toEqual(toni[2].cmyk.black);

        expect(tabellaToni._toni[4].id).toEqual(5);
        expect(tabellaToni._toni[4].tono.cmyk.cyan).toEqual(toni[1].cmyk.cyan);
        expect(tabellaToni._toni[4].tono.cmyk.magenta).toEqual(toni[1].cmyk.magenta);
        expect(tabellaToni._toni[4].tono.cmyk.yellow).toEqual(toni[1].cmyk.yellow);
        expect(tabellaToni._toni[4].tono.cmyk.black).toEqual(toni[1].cmyk.black);

        expect(tabellaToni._toni[5].id).toEqual(8);
        expect(tabellaToni._toni[5].tono.cmyk.cyan).toEqual(toni[3].cmyk.cyan);
        expect(tabellaToni._toni[5].tono.cmyk.magenta).toEqual(toni[3].cmyk.magenta);
        expect(tabellaToni._toni[5].tono.cmyk.yellow).toEqual(toni[3].cmyk.yellow);
        expect(tabellaToni._toni[5].tono.cmyk.black).toEqual(toni[3].cmyk.black);

        expect(tabellaToni._toni[6].id).toEqual(9);
        expect(tabellaToni._toni[6].tono.cmyk.cyan).toEqual(toni[7].cmyk.cyan);
        expect(tabellaToni._toni[6].tono.cmyk.magenta).toEqual(toni[7].cmyk.magenta);
        expect(tabellaToni._toni[6].tono.cmyk.yellow).toEqual(toni[7].cmyk.yellow);
        expect(tabellaToni._toni[6].tono.cmyk.black).toEqual(toni[7].cmyk.black);

        expect(tabellaToni._toni[7].id).toEqual(11);
        expect(tabellaToni._toni[7].tono.cmyk.cyan).toEqual(toni[6].cmyk.cyan);
        expect(tabellaToni._toni[7].tono.cmyk.magenta).toEqual(toni[6].cmyk.magenta);
        expect(tabellaToni._toni[7].tono.cmyk.yellow).toEqual(toni[6].cmyk.yellow);
        expect(tabellaToni._toni[7].tono.cmyk.black).toEqual(toni[6].cmyk.black);

        expect(tabellaToni._toni[8].id).toEqual(13);
        expect(tabellaToni._toni[8].tono.cmyk.cyan).toEqual(toni[8].cmyk.cyan);
        expect(tabellaToni._toni[8].tono.cmyk.magenta).toEqual(toni[8].cmyk.magenta);
        expect(tabellaToni._toni[8].tono.cmyk.yellow).toEqual(toni[8].cmyk.yellow);
        expect(tabellaToni._toni[8].tono.cmyk.black).toEqual(toni[8].cmyk.black);

        expect(tabellaToni._toni[9].id).toEqual(15);
        expect(tabellaToni._toni[9].tono.cmyk.cyan).toEqual(toni[9].cmyk.cyan);
        expect(tabellaToni._toni[9].tono.cmyk.magenta).toEqual(toni[9].cmyk.magenta);
        expect(tabellaToni._toni[9].tono.cmyk.yellow).toEqual(toni[9].cmyk.yellow);
        expect(tabellaToni._toni[9].tono.cmyk.black).toEqual(toni[9].cmyk.black);
    });
});

describe("Il metodo calcolaTonoMedio() di TabellaToniCMYK", function() {
    it("\n\tdeve ritornare undefined se la tabella è vuota", function() {
        expect(new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard()).calcolaTonoMedio()).toEqual(undefined);
    });

    it("\n\tdeve calcolare e ritornare il tono medio se la tabella non è vuota", function() {
        var tonoMedio;
        var numeroToni;
        var indiciToniEliminati = [9, 8, 6, 7, 3];

        for (var i = 0; i < 5; i++) {
            // Calcolo tono medio effettivo
            numeroToni = 0;
            tonoMedio = new SolidColor();
            tonoMedio.cmyk.cyan = 0;
            tonoMedio.cmyk.magenta = 0;
            tonoMedio.cmyk.yellow = 0;
            tonoMedio.cmyk.black = 0;

            for (var i = 0; i < toni.length; i++) {
                if (toni[i].cmyk.cyan == -1) {
                    continue;
                }

                numeroToni++;
                tonoMedio.cmyk.cyan += toni[i].cmyk.cyan;
                tonoMedio.cmyk.magenta += toni[i].cmyk.magenta;
                tonoMedio.cmyk.yellow += toni[i].cmyk.yellow;
                tonoMedio.cmyk.black += toni[i].cmyk.black;
            }

            tonoMedio.cmyk.cyan = Math.round(tonoMedio.cmyk.cyan / numeroToni);
            tonoMedio.cmyk.magenta = Math.round(tonoMedio.cmyk.magenta / numeroToni);
            tonoMedio.cmyk.yellow = Math.round(tonoMedio.cmyk.yellow / numeroToni);
            tonoMedio.cmyk.black = Math.round(tonoMedio.cmyk.black / numeroToni);

            // Confronto con tono medio ritornato da calcolaTonoMedio()
            tonoMedioRitornato = tabellaToni.calcolaTonoMedio();
            expect(tonoMedioRitornato.cmyk.cyan).toEqual(tonoMedio.cmyk.cyan);
            expect(tonoMedioRitornato.cmyk.magenta).toEqual(tonoMedio.cmyk.magenta);
            expect(tonoMedioRitornato.cmyk.yellow).toEqual(tonoMedio.cmyk.yellow);
            expect(tonoMedioRitornato.cmyk.black).toEqual(tonoMedio.cmyk.black);

            // Eliminazione ultimo tono
            tabellaToni._toni.length--;
        }
    });
});

describe("Il metodo toString() di TabellaToniCMYK", function() {
    it("\n\t", function() {
        
    });
});

describe("Il metodo toFile() di TabellaToniCMYK", function() {
    it("\n\t", function() {
        
    });
});