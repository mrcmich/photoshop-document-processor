var ScrittoreFileAstratto = {

    // Riceve un array di stringhe, in cui ogni stringa rappresenta una diversa linea da scrivere
    scriviSuFile: function(testoFormattato) {
        throw new Error(
            "Invocazione del metodo astratto scriviSuFile(testoFormattato) di ScrittoreFileAstratto."
        );
    },

};