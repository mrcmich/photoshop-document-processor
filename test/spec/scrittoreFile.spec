//@include "../../source/gestione-io/ScrittoreFile.jsx"

var timestamp;
var scrittoreFile = new ScrittoreFile();

describe("Il metodo scriviSuFile(listaLineeFile) di ScrittoreFile", function() {
    it("\n\tdeve lanciare un errore se listaLineeFile è null", function() {
        expect(function() {
            scrittoreFile.scriviSuFile(null);
        }).toThrowError();
    });

    it("\n\tdeve lanciare un errore se listaLineeFile è undefined", function() {
        expect(function() {
            scrittoreFile.scriviSuFile(undefined);
        }).toThrowError();
    });

    it("\n\tnon deve creare alcun file sul desktop se listaLineeFile è l'array vuoto", function() {
        timestamp = new Date();
        giorno = (timestamp.getDate() < 10) ? "0".concat(timestamp.getDate()) : timestamp.getDate();
        mese = ((timestamp.getMonth() + 1) < 10) ? "0".concat(timestamp.getMonth() + 1) : timestamp.getMonth() + 1;
        anno = timestamp.getYear() + 1900;
        ore = (timestamp.getHours() < 10) ? "0".concat(timestamp.getHours()) : timestamp.getHours();
        minuti = (timestamp.getMinutes() < 10) ? "0".concat(timestamp.getMinutes()) : timestamp.getMinutes();

        scrittoreFile.scriviSuFile([]);
        $.writeln(
            "Verifica che sul desktop non sia stato creato il file test_" + 
            giorno + "-" + mese + "-" + anno + 
            "_" +
            ore + "-" + minuti +
            ".txt"
        );
    });

    it("\n\tdeve creare file sul desktop se listaLineeFile non è l'array vuoto", function() {
        var inputs = [
            ["test","1"],
            ["test","1", "2", "3"],
            ["test","1", "2", "3", "4", "5", "6"],
            ["test","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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

                scrittoreFile.scriviSuFile(inputs[i]);
                $.writeln(
                    "Verifica che sul desktop sia stato creato il file test_" + 
                    giorno + "-" + mese + "-" + anno + 
                    "_" +
                    ore + "-" + minuti +
                    ".txt" +
                    " con contenuto " +
                    inputs[i] +
                    " (prefisso + un elemento per riga)"
                );
                i++;
            }
        }
    });
});