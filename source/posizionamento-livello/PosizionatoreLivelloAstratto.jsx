/**
* Oggetto JavaScript che rappresenta l'astrazione di un posizionatore livello,
* ovvero di un oggetto che riposiziona un livello, allineandolo opportunamente, in
* base alla regione cui appartiene nel suo documento. Deve essere settato come prototipo di un posizionatore livello, 
* il quale deve implementarne i metodi, oltre che avere come proprietà delle variabili per memorizzare il livello da riposizionare,
* la regione di tale livello e un margine per l'allineamento.
* @interface
*/
var PosizionatoreLivelloAstratto = {

    /**
    * Costante che rappresenta la regione sinistra di un documento.
    * @type {number}
    * @protected
    */
    _REGIONE_SINISTRA: -1,

    /**
    * Costante che rappresenta la regione centrale di un documento.
    * @type {number}
    * @protected
    */
    _REGIONE_CENTRALE: -2,

    /**
    * Costante che rappresenta la regione destra di un documento.
    * @type {number}
    * @protected
    */
    _REGIONE_DESTRA: -3,

    /**
    * Costante che rappresenta il margine di default, da usare per l'allineamento 
    * quando in un posizionatore livello non ne viene specificato uno.
    * @type {number}
    * @protected
    */
    _MARGINE_DEFAULT: 0,

    /**
    * Metodo senza implementazione per la rilevazione della regione in cui ricade il livello passato come parametro.
    * Si noti che tale livello deve anche essere impostato come proprietà del posizionatore livello su cui l'implementazione
    * di tale metodo è invocata.
    * @abstract
    * @param {ArtLayer} livello - il livello di cui si vuole determinare la regione nel documento.
    * @throws Lancia un errore quando invocato. 
    * @returns {undefined}
    */
    rilevaRegione: function(livello) {
        throw new Error(
            "Invocazione del metodo astratto rilevaRegione(livello) di PosizionatoreLivelloAstratto."
        );
    },

    /**
    * Metodo senza implementazione per il riposizionamento del livello impostato come proprietà di un posizionatore livello.
    * @abstract
    * @throws Lancia un errore quando invocato. 
    * @returns {undefined}
    */
    riposizionaLivello: function() {
        throw new Error(
            "Invocazione del metodo astratto riposizionaLivello() di PosizionatoreLivelloAstratto."
        );
    },

};