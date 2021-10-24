//@include "../oggetti-minimi/FiltroAstratto.jsx"

var FiltroTonalizzazioneAstratto = {
    __proto__: FiltroAstratto,

    _calcolaFattoriTonalizzazione: function(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore) {
        throw new Error(
            "Invocazione del metodo astratto " +
            "_calcolaFattoriTonalizzazione(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore) " +
            "di FiltroTonalizzazioneAstratto."
        );
    },

    _tonalizza: function(livelloRiferimento, campionatoreColore, riferimentiUtente) {
        throw new Error(
            "Invocazione del metodo astratto _tonalizza(livelloRiferimento, campionatoreColore, riferimentiUtente) " +
            "di FiltroTonalizzazioneAstratto."
        );
    },

    _determinaTonoRiferimento: function(tonoDefault) {
        throw new Error(
            "Invocazione del metodo astratto _determinaTonoRiferimento(tonoDefault) di FiltroTonalizzazioneAstratto."
        );
    },

    esegui: function(documenti) {
        throw new Error(
            "Invocazione del metodo astratto esegui(documenti) di FiltroTonalizzazioneAstratto."
        );
    },

};