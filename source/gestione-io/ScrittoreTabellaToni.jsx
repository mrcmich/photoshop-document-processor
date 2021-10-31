//@include "ScrittoreFileAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"

/**
* Constructor function per la creazione di un nuovo scrittore tabella toni,
* componente dedicato al salvataggio su file csv della tabella dei toni. 
* Ha ScrittoreFileAstratto come prototipo.
* @constructor
*/
function ScrittoreTabellaToni() {
    this.__proto__ = ScrittoreFileAstratto;

    /**
    * Metodo per il salvataggio su file csv dell'array di stringhe passato
    * come parametro, crea un nuovo file con nome del tipo "tabella_toni_gg-mm-yyyy_oo-mm.csv" 
    * sul Desktop e in esso scrive le informazioni. Ritorna true se il salvataggio è avvenuto con successo, false altrimenti.
    * @param {Array} listaLineeFile - array contenente le stringhe da scrivere su file, dove ogni stringa rappresenta una diversa riga della tabella dei toni.
    * @throws Lancia un errore se non è possibile creare o scrivere il file.
    * @returns {boolean}
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
            return true;
        }

        timestamp = new Date();
        giorno = (timestamp.getDate() < 10) ? "0".concat(timestamp.getDate()) : timestamp.getDate();
        mese = ((timestamp.getMonth() + 1) < 10) ? "0".concat(timestamp.getMonth() + 1) : timestamp.getMonth() + 1;
        anno = timestamp.getYear() + 1900;
        ore = (timestamp.getHours() < 10) ? "0".concat(timestamp.getHours()) : timestamp.getHours();
        minuti = (timestamp.getMinutes() < 10) ? "0".concat(timestamp.getMinutes()) : timestamp.getMinutes();

        nomeFile = "tabella_toni_" + 
            giorno + "-" + mese + "-" + anno + 
            "_" +
            ore + "-" + minuti +
            ".csv"
        ;

        file = new File(Folder.desktop + "/" + nomeFile);

        if (!file.open("w")) {
            alert(
                "Impossibile scrivere su file la tabella dei toni.",
                "Errore di creazione file",
                true
            );

            return false;
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
                return false;
            }
        }

        file.close();

        alert(
            "Tabella dei toni salvata sul Desktop come " + nomeFile + ".",
            "Salvataggio tabella toni riuscito"
        );

        return true;
    };

}