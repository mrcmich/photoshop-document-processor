#include "ScrittoreFileAstratto.jsx"

function ScrittoreFileTestuale() {
    this.__proto__ = ScrittoreFileAstratto;

    this.scriviSuFile = function(testoFormattato) {
        var file;

        asserzione(
            testoFormattato != undefined, 
            "scriviSuFile(testoFormattato)", 
            "ScrittoreFileTestuale", 
            "testoFormattato null o undefined."
        );

        if (testoFormattato.length == 0) {
            return;
        }

        file = File.saveDialog("Selezione file di salvataggio dati");

        if (file == null) {
            return;
        }

        if (!file.open("a")) {
            alert(
                "Impossibile aprire il file selezionato.",
                "Errore I/O",
                true
            );

            return;
        }

        if (!file.writeln(testoFormattato.toString())) {
            alert(
                "Impossibile scrivere sul file selezionato.",
                "Errore I/O",
                true
            );
        }

        file.close();
    };

}