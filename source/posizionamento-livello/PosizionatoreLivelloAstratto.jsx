var PosizionatoreLivelloAstratto = {
    REGIONE_SINISTRA = 0,
    REGIONE_CENTRALE = 1,
    REGIONE_DESTRA = 2,

    rilevaRegione: function(livello) {
        throw new SyntaxError("Invocazione del metodo astratto rilevaRegione(livello, documento) di PosizionatoreLivelloAstratto.");
    },

    riposizionaLivello: function(livello, margine) {
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