var PosizionatoreLivelloAstratto = {
    REGIONE_SINISTRA = -1,
    REGIONE_CENTRALE = -2,
    REGIONE_DESTRA = -3,
    MARGINE_DEFAULT = 0,

    rilevaRegione: function(livello) {
        throw new SyntaxError("Invocazione del metodo astratto rilevaRegione(livello, documento) di PosizionatoreLivelloAstratto.");
    },

    riposizionaLivello: function() {
        throw new SyntaxError(`
            Invocazione del metodo astratto riposizionaLivello(livello, documento, regione, margine) di PosizionatoreLivelloAstratto.
        `);
    }

};

Object.defineProperty(PosizionatoreLivelloAstratto, "REGIONE_SINISTRA", {
    "writable": false,
    "enumerable": false,
    "configurable": false
});

Object.defineProperty(PosizionatoreLivelloAstratto, "REGIONE_CENTRALE", {
    "writable": false,
    "enumerable": false,
    "configurable": false
});

Object.defineProperty(PosizionatoreLivelloAstratto, "REGIONE_DESTRA", {
    "writable": false,
    "enumerable": false,
    "configurable": false
});

Object.defineProperty(PosizionatoreLivelloAstratto, "MARGINE_DEFAULT", {
    "writable": false,
    "enumerable": false,
    "configurable": false
});