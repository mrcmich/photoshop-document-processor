//@include "../../source/gestione-io/ScrittoreTabellaToni.jsx"

var timestamp;
var scrittoreTabellaToni = new ScrittoreTabellaToni();

describe("Il metodo scriviSuFile(listaLineeFile) di ScrittoreTabellaToni", function() {
    it("\n\tdeve lanciare un errore se listaLineeFile è null", function() {
        expect(function() {
            scrittoreTabellaToni.scriviSuFile(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se listaLineeFile è undefined", function() {
        expect(function() {
            scrittoreTabellaToni.scriviSuFile(undefined);
        }).toThrowError();
    });

    it("\n\tnon deve creare alcun file sul desktop se listaLineeFile è l'array vuoto", function() {
        timestamp = new Date();
        giorno = (timestamp.getDate() < 10) ? "0".concat(timestamp.getDate()) : timestamp.getDate();
        mese = ((timestamp.getMonth() + 1) < 10) ? "0".concat(timestamp.getMonth() + 1) : timestamp.getMonth() + 1;
        anno = timestamp.getYear() + 1900;
        ore = (timestamp.getHours() < 10) ? "0".concat(timestamp.getHours()) : timestamp.getHours();
        minuti = (timestamp.getMinutes() < 10) ? "0".concat(timestamp.getMinutes()) : timestamp.getMinutes();

        scrittoreTabellaToni.scriviSuFile([]);
        $.writeln(
            "Verifica che sul desktop non sia stato creato il file tabella_toni_" + 
            giorno + "-" + mese + "-" + anno + 
            "_" +
            ore + "-" + minuti +
            ".csv"
        );
    });

    it("\n\tdeve creare file sul desktop se listaLineeFile non è l'array vuoto", function() {
        var inputs = [
            ["1;1"],
            ["1;3", "2;0", "3;9"],
            ["1;10", "2;9", "3;7", "4;3", "5;4", "6;9", "7;7", "8;1", "9;0", "10;1", "11;0", "12;12"],
            ["1;10", "2;9", "3;7", "4;3", "5;4", "6;9", "7;7", "8;1", "9;0", "10;1", "11;0", "12;12", "13;a", "14;a", "15;a", "16;a", "17;a"],
        ];

        var i = 0;
        timestamp = new Date();

        for(;;) {
            if (i == inputs.length) {
                break;
            }

            if (new Date().getMinutes() - timestamp.getMinutes() > 0) {
                timestamp = new Date();
                giorno = (timestamp.getDate() < 10) ? "0".concat(timestamp.getDate()) : timestamp.getDate();
                mese = ((timestamp.getMonth() + 1) < 10) ? "0".concat(timestamp.getMonth() + 1) : timestamp.getMonth() + 1;
                anno = timestamp.getYear() + 1900;
                ore = (timestamp.getHours() < 10) ? "0".concat(timestamp.getHours()) : timestamp.getHours();
                minuti = (timestamp.getMinutes() < 10) ? "0".concat(timestamp.getMinutes()) : timestamp.getMinutes();
                scrittoreTabellaToni.scriviSuFile(inputs[i]);
                $.writeln(
                    "Verifica che sul desktop sia stato creato il file tabella_toni_" + 
                    giorno + "-" + mese + "-" + anno + 
                    "_" +
                    ore + "-" + minuti +
                    ".csv" +
                    " con contenuto " +
                    inputs[i] +
                    " (una coppia di elementi per riga)"
                );
                i++;
            }
        }
    });
});