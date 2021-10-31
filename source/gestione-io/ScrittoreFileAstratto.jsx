/**
* Oggetto JavaScript che rappresenta l'astrazione di uno scrittore file, ovvero di un componente
* deputato al salvataggio su file di informazioni testuali codificate opportunamente.
* Deve essere settato come prototipo di uno scrittore file, il quale deve implementarne i metodi.
* @interface
*/
var ScrittoreFileAstratto = {

    /**
    * Metodo senza implementazione per il salvataggio su file dell'array di stringhe passato
    * come parametro. Ritorna true se il salvataggio è avvenuto con successo, false altrimenti.
    * @abstract
    * @param {Array} listaLineeFile - array contenente le stringhe da scrivere su file, dove ogni stringa rappresenta una diversa linea.
    * @throws Lancia un errore quando invocato.
    * @returns {boolean}
    */
    scriviSuFile: function(listaLineeFile) {
        throw new Error(
            "Invocazione del metodo astratto scriviSuFile(listaLineeFile) di ScrittoreFileAstratto."
        );
    },

};