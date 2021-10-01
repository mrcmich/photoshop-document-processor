#include "../oggetti-minimi/FiltroAstratto.jsx"

var FiltroLetturaTonoAstratto = {
    __proto__: FiltroAstratto,

    esegui: function(documenti) {
        throw new Error(
            "Invocazione del metodo astratto esegui(documenti) di FiltroLetturaTonoAstratto."
        );
    },

    rilevaTono: function(livello, campionatoreColore) {
        throw new Error(
            "Invocazione del metodo astratto rilevaTono(livello, campionatoreColore) di FiltroLetturaTonoAstratto."
        );
    },

    validaTono: function(tono) {
        throw new Error(
            "Invocazione del metodo astratto validaTono(tono) di FiltroLetturaTonoAstratto."
        );
    },

    _compilaTabellaToni: function() {
        throw new Error(
            "Invocazione del metodo astratto _compilaTabellaTonifunction() di FiltroLetturaTonoAstratto."
        );
    },

};