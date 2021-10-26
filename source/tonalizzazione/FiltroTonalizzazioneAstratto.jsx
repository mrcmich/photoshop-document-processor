//@include "../oggetti-minimi/FiltroAstratto.jsx"

/**
* Oggetto JavaScript che rappresenta l'astrazione di un filtro tonalizzazione, ovvero un oggetto
* che gestisce la tonalizzazione di un set di documenti ad un riferimento specificato dall'utente. 
* Deve essere settato come prototipo di un filtro tonalizzazione, il quale deve implementarne i metodi.
* Ha FiltroAstratto come prototipo.
* @interface
*/
var FiltroTonalizzazioneAstratto = {
    __proto__: FiltroAstratto,

    /**
    * Metodo senza implementazione per il calcolo dei fattori di tonalizzazione, intesi come
    * gli incrementi da applicare ad un miscelatore canale per riportare il tono di un documento a riferimento.
    * @abstract
    * @param {ArtLayer} livelloRiferimento - il livello del documento rispetto al quale calcolare i fattori di tonalizzazione, tipicamente una tinta piatta.
    * @param {SolidColor} tonoIniziale - il tono iniziale del documento (opzionale), valutato su livelloRiferimento.
    * @param {SolidColor} tonoRiferimento - il tono di riferimento, a cui il tono del documento deve essere riportato.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla lettura delle quantità percentuali dei canali del documento.
    * @throws Lancia un errore quando invocato.
    * @returns {SolidColor}
    */
    _calcolaFattoriTonalizzazione: function(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore) {
        throw new Error(
            "Invocazione del metodo astratto " +
            "_calcolaFattoriTonalizzazione(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore) " +
            "di FiltroTonalizzazioneAstratto."
        );
    },

    /**
    * Metodo senza implementazione per la tonalizzazione di un documento, tonalizzazione che viene effettuata
    * rispetto al livello di riferimento passato come parametro.
    * @abstract
    * @param {ArtLayer} livelloRiferimento - il livello del documento rispetto al quale tonalizzare, tipicamente una tinta piatta.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla lettura delle quantità percentuali dei canali del documento.
    * @param {Object} riferimentiUtente - oggetto usato per memorizzare i riferimenti inseriti dall'utente per ciascun canale del documento.
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    _tonalizza: function(livelloRiferimento, campionatoreColore, riferimentiUtente) {
        throw new Error(
            "Invocazione del metodo astratto _tonalizza(livelloRiferimento, campionatoreColore, riferimentiUtente) " +
            "di FiltroTonalizzazioneAstratto."
        );
    },

    /**
    * Metodo senza implementazione per la richiesta dei riferimenti dei canali del documento all'utente,
    * riferimenti che possono essere inseriti sotto forma di singoli valori o di intervalli. Ritorna un oggetto
    * che contiene i riferimenti inseriti o undefined se l'utente annulla l'inserimento.
    * @abstract
    * @param {SolidColor} tonoDefault - il tono di default con cui vengono inizializzate le finestre di dialogo per la richiesta dei riferimenti.
    * @throws Lancia un errore quando invocato.
    * @returns {Object}
    */
    _determinaTonoRiferimento: function(tonoDefault) {
        throw new Error(
            "Invocazione del metodo astratto _determinaTonoRiferimento(tonoDefault) di FiltroTonalizzazioneAstratto."
        );
    },

    /**
    * Metodo senza implementazione per l'esecuzione del filtro tonalizzazione.
    * Il filtro si applica all'array di documenti passato come parametro.
    * @abstract
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    esegui: function(documenti) {
        throw new Error(
            "Invocazione del metodo astratto esegui(documenti) di FiltroTonalizzazioneAstratto."
        );
    },

};