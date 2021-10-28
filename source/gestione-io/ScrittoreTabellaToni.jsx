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
        var giorno;
        var mese;
        var anno;
        var ore;
        var minuti;

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
        giorno = (timestamp.getDate() < 10) ? "0".concat(timestamp.getDate()) : timestamp.getDate();
        mese = (timestamp.getMonth() < 10) ? "0".concat(timestamp.getMonth()) : timestamp.getMonth();
        anno = timestamp.getYear() + 1900;
        ore = (timestamp.getHours() < 10) ? "0".concat(timestamp.getHours()) : timestamp.getHours();
        minuti = (timestamp.getMinutes() < 10) ? "0".concat(timestamp.getMinutes()) : timestamp.getMinutes();

        nomeFile = "tabella_toni_" + 
            giorno + "-" + mese + "-" + anno + 
            "_" +
            ore + "-" + minuti +
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
            "Tabella dei toni salvata sul Desktop come " + nomeFile + ".",
            "Salvataggio tabella toni riuscito"
        );
    };

}