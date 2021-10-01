var ScrittoreFileAstratto = {

    // Riceve un array di stringhe, in cui ogni stringa rappresenta una diversa linea da scrivere
    scriviSuFile: function(listaLineeFile) {
        throw new Error(
            "Invocazione del metodo astratto scriviSuFile(listaLineeFile) di ScrittoreFileAstratto."
        );
    },

};