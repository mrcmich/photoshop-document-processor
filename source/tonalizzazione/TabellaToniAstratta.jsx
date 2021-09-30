var TabellaToniAstratta = {
    aggiungiTono: function(documento, tono) {
        throw new Error(
            "Invocazione del metodo astratto aggiungiTono(documento, tono) di TabellaToniAstratta."
        );
    },

    calcolaTonoMedio: function() {
         throw new Error(
            "Invocazione del metodo astratto calcolaTonoMedio() di TabellaToniAstratta."
        );
    },

    toString: function() {
         throw new Error(
            "Invocazione del metodo astratto toString() di TabellaToniAstratta."
        );
    },

};