//@include "ScrittoreFileAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"

/**
* Constructor function per la creazione di un nuovo scrittore tabella toni,
* componente dedicato al salvataggio su file della tabella dei toni. 
* Ha ScrittoreFileAstratto come prototipo.
* @constructor
*/
function ScrittoreTabellaToni() {
    this.__proto__ = ScrittoreFileAstratto;

    /**
    * Metodo per il salvataggio su file dell'array di stringhe passato
    * come parametro, crea un nuovo file con nome del tipo "tabella_toni_gg-mm-yyyy_oo-mm.txt" sul Desktop
    * e in esso scrive le informazioni.
    * @abstract
    * @param {Array} listaLineeFile - array contenente le stringhe da scrivere su file, dove ogni stringa rappresenta una diversa riga della tabella dei toni.
    * @throws Lancia un errore se non è possibile creare o scrivere il file.
    * @returns {undefined}
    */
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
                file.remove();
                return;
            }
        }

        file.close();

        alert(
            "Tabella dei toni salvata sul Desktop come '" + nomeFile + "''.",
            "Salvataggio tabella toni riuscito"
        );
    };

}