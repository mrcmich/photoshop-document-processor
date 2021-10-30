//@include "../../source/tonalizzazione/FiltroLetturaTonoCMYK.jsx"
//@include "../../source/tonalizzazione/FiltroTonalizzazioneCMYK.jsx"

if (app.documents.length == 0) {
    throw new Error(
        "Nessun documento aperto in Photoshop!" +
        "Aprire i documenti salvati in ./test/docs/FiltroTonalizzazioneCMYK/dopo e riprovare!"
    );
}

var filtroLetturaTono = new FiltroLetturaTonoCMYK(new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard()), new ScrittoreTabellaToni());
var filtroTonalizzazione = new FiltroTonalizzazioneCMYK(filtroLetturaTono);

describe("Il metodo settaFiltroLetturaTonoCMYK(filtroLetturaTonoCMYK) di FiltroTonalizzazioneCMYK", function() {
    it("\n\tdeve lanciare un errore se filtroLetturaTonoCMYK è null", function() {
        expect(function() {
            filtroTonalizzazione.settaFiltroLetturaTonoCMYK(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se filtroLetturaTonoCMYK è undefined", function() {
        expect(function() {
            filtroTonalizzazione.settaFiltroLetturaTonoCMYK(undefined);
        }).toThrowError();
    });
});

describe("Il metodo _validaPercentualeCanale(stringaPercentuale) di FiltroTonalizzazioneCMYK", function() {
    it("\n\tdeve ritornare false se stringaPercentuale è null", function() {
        expect(filtroTonalizzazione._validaPercentualeCanale(null)).toEqual(false);
    });

    it("\n\tdeve ritornare false se stringaPercentuale è undefined", function() {
        expect(filtroTonalizzazione._validaPercentualeCanale(undefined)).toEqual(false);
    });

    it("\n\tdeve ritornare false se stringaPercentuale non è una stringa numerica", function() {
        expect(filtroTonalizzazione._validaPercentualeCanale("pippo")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("53g")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("f44g")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("skjfsdkj fskdsj fjsdfgs")).toEqual(false);
    });

    it("\n\tdeve ritornare false se stringaPercentuale è una stringa numerica < 0", function() {
        expect(filtroTonalizzazione._validaPercentualeCanale(String(Number.MAX_VALUE * -1))).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("-0.0001")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("-1")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("-10.7")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("-31.9")).toEqual(false);
    });

    it("\n\tdeve ritornare false se stringaPercentuale è una stringa numerica > 100", function() {
        expect(filtroTonalizzazione._validaPercentualeCanale(String(Number.MAX_VALUE))).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("100.0001")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("101")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("3212.9")).toEqual(false);
        expect(filtroTonalizzazione._validaPercentualeCanale("353.2")).toEqual(false);
    });

    it("\n\tdeve ritornare true se stringaPercentuale è una stringa numerica in [0,100]", function() {
        expect(filtroTonalizzazione._validaPercentualeCanale("0")).toEqual(true);
        expect(filtroTonalizzazione._validaPercentualeCanale("100")).toEqual(true);
        expect(filtroTonalizzazione._validaPercentualeCanale("35.8")).toEqual(true);
        expect(filtroTonalizzazione._validaPercentualeCanale("73")).toEqual(true);
        expect(filtroTonalizzazione._validaPercentualeCanale("21.1")).toEqual(true);
        expect(filtroTonalizzazione._validaPercentualeCanale("0.001")).toEqual(true);
        expect(filtroTonalizzazione._validaPercentualeCanale("99.999")).toEqual(true);
    });
});

describe("Il metodo _determinaRiferimentoCanale(canale, riferimentoDefault) di FiltroTonalizzazioneCMYK", function() {
    it("\n\tdeve ritornare l'array [Math.round(val)] se l'utente inserisce un singolo valore val valido", function() {
        var inputs = [
            0,
            0.001,
            100,
            99.999,
            21.3,
            77,
            55.6,
            1.2,
            97,
            33.15
        ];

        $.writeln("Inserire i valori validi: " + inputs + " e la stringa vuota e verificare il superamento dei test.");

        for (var i = 0; i < inputs.length; i++) {
            var ref = filtroTonalizzazione._determinaRiferimentoCanale("Test valore singolo valido", "100");
            expect(ref.length).toEqual(1);
            expect(ref[0]).toEqual(Math.round(inputs[i]));
        }

        var ref = filtroTonalizzazione._determinaRiferimentoCanale("Test valore singolo valido", "100");
        expect(ref.length).toEqual(1);
        expect(ref[0]).toEqual(0);
    });
    
    it("\n\tdeve ritornare l'array [Math.round(min),Math.round(max)] se l'utente inserisce un range [min,max] valido", function() {
        var inputs = [
            [10,33],
            [0,100],
            [0.001,99.999],
            [19.6,77.9],
            [20,50],
            [11,63.1],
            [33,65],
            [1,99],
            [0,0], // inserisci input ":"
            [0,1]  // inserisci input ":1"
        ];

        $.writeln("Inserire gli intervalli validi: " + inputs + " e verificare il superamento dei test.");

        for (var i = 0; i < inputs.length; i++) {
            var ref = filtroTonalizzazione._determinaRiferimentoCanale("Test intervallo valido", "0:100");
            expect(ref.length).toEqual(2);
            expect(ref[0]).toEqual(Math.round(inputs[i][0]));
            expect(ref[1]).toEqual(Math.round(inputs[i][1]));
        }
    });
    
    it("\n\tdeve ritornare undefined se l'utente annulla l'inserimento", function() {
        $.writeln("Annullare l'inserimento e verificare che il test sia superato")
        expect(filtroTonalizzazione._determinaRiferimentoCanale("Test annullamento", "1")).toEqual(undefined);
    });
    
    it("\n\tdeve mostrare un avvertimento e richiedere l'inserimento se l'utente inserisce un input non valido", function() {
        var inputs = [
            -10,
            133,
            171.3,
            -1,
            "pippo",
            "aaa aaa b b",
            "11:33:89",
            "3:",
            "40:18",
            "10:10:10:99",
            "33,1:88,0",
        ];

        $.writeln("Inserire gli input NON validi: " + inputs + " e verificare che compaia l'avvertimento Riferimento non valido.");

        for (var i = 0; i < inputs.length; i++) {
            filtroTonalizzazione._determinaRiferimentoCanale("Test input non validi", "");
        }
    });
});

describe("Il metodo _determinaTonoRiferimento(tonoDefault) di FiltroTonalizzazioneCMYK", function() {
    it("\n\tdeve ritornare undefined se l'utente annulla l'inserimento", function() {
        var canali = ["ciano", "magenta", "giallo", "nero"];
        var tonoDef = new SolidColor();
        tonoDef.cmyk.cyan = 18;
        tonoDef.cmyk.magenta = 33;
        tonoDef.cmyk.yellow = 45;
        tonoDef.cmyk.black = 17;

        for (var i = 0; i < 4; i++) {
            $.writeln("Annulla durante inserimento riferimento " + canali[i]);
        }

        for (var i = 0; i < 4; i++) {
            expect(filtroTonalizzazione._determinaTonoRiferimento(tonoDef)).toEqual(undefined);
        }
    });

    it("\n\tdeve ritornare un oggetto riferimenti se l'utente non annulla l'inserimento", function() {
        var oggettiValidi = [
            [[10],[3,5],[77],[18,20]],
            [[0],[10,20],[3],[80,100]],
            [[65],[10,11],[23],[2,4]],
            [[100],[9,13],[44],[2,6]],
        ];

        var tonoDef = new SolidColor();
        tonoDef.cmyk.cyan = 18;
        tonoDef.cmyk.magenta = 33;
        tonoDef.cmyk.yellow = 45;
        tonoDef.cmyk.black = 17;

        $.writeln(
            "Inserire i riferimenti validi:\n" +
            "10,3:5,77,18:20" +
            "0,10:20,3,80:100" +
            "65,10:11,23,2:4" +
            "100,9:13,44,2:6"
        );

        for (var i = 0; i < oggettiValidi.length; i++) {
            var oggettoRiferimenti = filtroTonalizzazione._determinaTonoRiferimento(tonoDef);
            expect(oggettoRiferimenti.cyan[0]).toEqual(oggettiValidi[i][0][0]);
            expect(oggettoRiferimenti.magenta[0]).toEqual(oggettiValidi[i][1][0]);
            expect(oggettoRiferimenti.magenta[1]).toEqual(oggettiValidi[i][1][1]);
            expect(oggettoRiferimenti.yellow[0]).toEqual(oggettiValidi[i][2][0]);
            expect(oggettoRiferimenti.black[0]).toEqual(oggettiValidi[i][3][0]);
            expect(oggettoRiferimenti.black[1]).toEqual(oggettiValidi[i][3][1]);
        }
    });
});

describe("Il metodo _determinaRiferimentoEffettivoCanale(riferimento, valoreIniziale) di FiltroTonalizzazioneCMYK", function() {
    it("\n\tdeve ritornare riferimento[0] se riferimento contiene un solo valore", function() {
        var refs = [
            [1],
            [13],
            [18],
            [99],
            [0],
            [100],
            [33],
            [61],
            [87],
        ];

        for (var i = 0; i < refs.length; i++) {
            expect(filtroTonalizzazione._determinaRiferimentoEffettivoCanale(refs[i], 50)).toEqual(refs[i][0]);
        }
    });

    it("\n\tdeve ritornare riferimento[0] (min) se riferimento contiene due valori e valoreIniziale < min", function() {
        var refs = [
            [33,45],
            [14,17],
            [18,31],
            [99,100],
            [15,20],
            [33,34],
            [56,59],
            [73,77],
            [87,90],
        ];

        for (var i = 0; i < refs.length; i++) {
            expect(filtroTonalizzazione._determinaRiferimentoEffettivoCanale(refs[i], 13)).toEqual(refs[i][0]);
        }
    });

    it("\n\tdeve ritornare riferimento[1] (max) se riferimento contiene due valori e valoreIniziale > max", function() {
        var refs = [
            [33,45],
            [14,17],
            [18,31],
            [81,87],
            [15,20],
            [33,34],
            [56,59],
            [73,77],
            [87,90],
        ];

        for (var i = 0; i < refs.length; i++) {
            expect(filtroTonalizzazione._determinaRiferimentoEffettivoCanale(refs[i], 94)).toEqual(refs[i][1]);
        }
    });

    it("\n\tdeve ritornare valoreIniziale se riferimento contiene due valori e riferimento[0] (min) <= valoreIniziale <= riferimento[1] (max)", function() {
        var refs = [
            [33,54],
            [14,60],
            [18,77],
            [44,87],
            [15,20],
            [33,34],
            [56,59],
            [77,80],
            [87,90],
        ];

        var valIn = [
            39,
            33,
            50,
            46,
            15,
            34,
            58,
            79,
            88
        ];

        for (var i = 0; i < refs.length; i++) {
            expect(filtroTonalizzazione._determinaRiferimentoEffettivoCanale(refs[i], valIn[i])).toEqual(valIn[i]);
        }
    });
});

describe("Il metodo esegui(documenti) di FiltroTonalizzazioneCMYK", function() {
    var nomiNonValidi = {
        "08_TEST_LETTURA.jpg": 1,
        "15_TEST_LETTURA.jpg": 1,
    };

    var docsValidi = [];

    for (var j = 0; j < app.documents.length; j++) {
        if (!(app.documents[j].name in nomiNonValidi)) {
            docsValidi.push(app.documents[j]);
        }
    }

    it("\n\tdeve uscire senza errori se documenti è l'array vuoto", function() {
        expect(function() {
            filtroTonalizzazione.esegui([]);
        }).not.toThrowError();
    });

    it("\n\tdeve uscire senza errori se l'utente annulla l'inserimento del riferimento", function() {
        $.writeln("docsValidi=\n" + docsValidi);

        expect(function() {
            filtroTonalizzazione.esegui(docsValidi);
        }).not.toThrowError();
    });

    it("\n\tdeve tonalizzare i documenti, ignorando e segnalando ALLA FINE i documenti con tono non valido e quelli non tonalizzabili", function() {
        $.writeln("Inserire come tono di riferimento: 17,10:12,10,2:3")
        filtroTonalizzazione.esegui(app.documents);
    });
});

