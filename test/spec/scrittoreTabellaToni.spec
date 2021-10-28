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
        scrittoreTabellaToni.scriviSuFile([]);
        $.writeln(
            "Verifica che sul desktop non sia stato creato il file tabella_toni_" + 
            timestamp.getDate() + "-" +
            timestamp.getMonth() + "-" +
            (timestamp.getYear() + 1900 ) + "_" +
            timestamp.getHours() + "-" +
            timestamp.getMinutes() + ".txt"
        );
    });

    it("\n\tdeve creare file sul desktop se listaLineeFile non è l'array vuoto", function() {
        var inputs = [
            ["1"],
            ["1", "2", "3"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
        ];

        var i = 0;
        timestamp = new Date();

        for(;;) {
            if (i == inputs.length) {
                break;
            }

            if (new Date().getMinutes() - timestamp.getMinutes() > 0) {
                timestamp = new Date();
                scrittoreTabellaToni.scriviSuFile(inputs[i]);
                $.writeln(
                    "Verifica che sul desktop sia stato creato il file 'tabella_toni_" + 
                    timestamp.getDate() + "-" +
                    timestamp.getMonth() + "-" +
                    (timestamp.getYear() + 1900 ) + "_" +
                    timestamp.getHours() + "-" +
                    timestamp.getMinutes() + ".txt'" + 
                    " con contenuto " +
                    inputs[i] +
                    " (un elemento per riga)"
                );
                i++;
            }
        }
    });
});