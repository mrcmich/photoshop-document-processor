#include "../oggetti-minimi/FiltroAstratto.jsx"

var FiltroTonalizzazioneAstratto = {
    __proto__: FiltroAstratto,

    _rilevaTono: function(documento) {
        throw new Error(
            "Invocazione del metodo astratto _rilevaTono(documento) di FiltroTonalizzazioneAstratto."
        );
    },

    _determinaTonoRiferimento: function() {
         throw new Error(
            "Invocazione del metodo astratto _determinaTonoRiferimento() di FiltroTonalizzazioneAstratto."
        );
    },

    _calcolaFattoriTonalizzazione: function(documento, tono) {
         throw new Error(
            "Invocazione del metodo astratto _calcolaFattoriTonalizzazione(documento, tono) di FiltroTonalizzazioneAstratto."
        );
    },

    _bilanciaTonoDocumento: function(documento, tono) {
         throw new Error(
            "Invocazione del metodo astratto _bilanciaTonoDocumento(documento, tono) di FiltroTonalizzazioneAstratto."
        );
    },

    esegui: function(documenti) {
         throw new Error(
            "Invocazione del metodo astratto esegui(documenti) di FiltroTonalizzazioneAstratto."
        );
    } 

};