//@include "ScrittoreFileAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"

/**
* Constructor function per la creazione di un nuovo scrittore file,
* componente dedicato al salvataggio di informazioni testuali su file txt.
* Ha ScrittoreFileAstratto come prototipo.
* @constructor
*/
function ScrittoreFile() {
    this.__proto__ = ScrittoreFileAstratto;

    /**
    * Metodo per il salvataggio su file txt dell'array di stringhe passato
    * come parametro, crea un nuovo file con nome del tipo "prefisso_gg-mm-yyyy_oo-mm.txt" (dove prefisso è la prima
    * stringa del parametro listaLineeFile) sul Desktop e in esso scrive le informazioni.
    * @param {Array} listaLineeFile - array contenente le stringhe da scrivere su file, dove ogni stringa rappresenta una diversa linea.
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
        var prefisso;

        asserzione(
            listaLineeFile != undefined, 
            "scriviSuFile(listaLineeFile)", 
            "ScrittoreTabellaToni", 
            "listaLineeFile null o undefined."
        );

        if (listaLineeFile.length == 0) {
            return;
        }

        prefisso = listaLineeFile[0];
        timestamp = new Date();
        giorno = (timestamp.getDate() < 10) ? "0".concat(timestamp.getDate()) : timestamp.getDate();
        mese = ((timestamp.getMonth() + 1) < 10) ? "0".concat(timestamp.getMonth() + 1) : timestamp.getMonth() + 1;
        anno = timestamp.getYear() + 1900;
        ore = (timestamp.getHours() < 10) ? "0".concat(timestamp.getHours()) : timestamp.getHours();
        minuti = (timestamp.getMinutes() < 10) ? "0".concat(timestamp.getMinutes()) : timestamp.getMinutes();

        nomeFile = prefisso + "_" +
            giorno + "-" + mese + "-" + anno + 
            "_" +
            ore + "-" + minuti +
            ".txt"
        ;

        file = new File(Folder.desktop + "/" + nomeFile);

        if (!file.open("w")) {
            alert(
                "Impossibile scrivere " + prefisso + " su file.",
                "Errore di creazione file",
                true
            );

            return;
        }

        for (var i = 1; i < listaLineeFile.length; i++) {
            if (!file.writeln(listaLineeFile[i])) {
                alert(
                    "Impossibile scrivere " + prefisso + " su file.",
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
            "File " + prefisso + " salvato sul Desktop come " + nomeFile + ".",
            "Salvataggio file " + prefisso + " riuscito"
        );
    };

}