var PosizionatoreLivelloAstratto = {
    _REGIONE_SINISTRA: -1,
    _REGIONE_CENTRALE: -2,
    _REGIONE_DESTRA: -3,
    _MARGINE_DEFAULT: 0,

    rilevaRegione: function(livello) {
        throw new Error(
            "Invocazione del metodo astratto rilevaRegione(livello) di PosizionatoreLivelloAstratto."
        );
    },

    riposizionaLivello: function() {
        throw new Error(
            "Invocazione del metodo astratto riposizionaLivello() di PosizionatoreLivelloAstratto."
        );
    },

};