#include "ScrittoreFileAstratto.jsx"
#include "../oggetti-minimi/Asserzione.jsx"

function ScrittoreTabellaToni() {
    this.__proto__ = ScrittoreFileAstratto;

    this.scriviSuFile = function(listaLineeFile) {
        var file;
        var timestamp;
        var nomeFile;

        asserzione(
            listaLineeFile != undefined, 
            "scriviSuFile(listaLineeFile)", 
            "ScrittoreTabellaToni", 
            "listaLineeFile null o undefined."
        );

        if (listaLineeFile.length == 0) {
            return;
        }

        timestamp = new Date();
        nomeFile = "tabella_toni_" + 
            timestamp.getDate() + "-" +
            timestamp.getMonth() + "-" +
            (timestamp.getYear() + 1900 ) + 
            "_" +
            timestamp.getHours() + "-" +
            timestamp.getMinutes() +
            ".txt"
        ;

        file = new File(Folder.desktop + "/" + nomeFile);

        if (!file.open("w")) {
            alert(
                "Impossibile scrivere su file la tabella dei toni.",
                "Errore di creazione file",
                true
            );

            return;
        }

        for (var i = 0; i < listaLineeFile.length; i++) {
            if (!file.writeln(listaLineeFile[i])) {
                alert(
                    "Impossibile scrivere su file la tabella dei toni.",
                    "Errore di scrittura file",
                    true
                );

                file.close();
                return;
            }
        }

        file.close();

        alert(
            "Tabella dei toni salvata sul Desktop come " + nomeFile + ".",
            "Salvataggio tabella toni riuscito"
        );
    };

}