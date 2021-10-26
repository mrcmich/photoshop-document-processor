//@include "../oggetti-minimi/FiltroAstratto.jsx"

/**
* Oggetto JavaScript che rappresenta l'astrazione di un filtro lettura tono, ovvero un oggetto
* che gestisce la lettura del tono di un set di documenti e la compilazione di una tabella dei toni.
* Ha FiltroAstratto come prototipo.
* @interface
*/
var FiltroLetturaTonoAstratto = {
    __proto__: FiltroAstratto,

    /**
    * Metodo senza implementazione per l'esecuzione del filtro lettura tono.
    * Il filtro si applica all'array di documenti passato come parametro.
    * @abstract
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    esegui: function(documenti) {
        throw new Error(
            "Invocazione del metodo astratto esegui(documenti) di FiltroLetturaTonoAstratto."
        );
    },

    /**
    * Metodo senza implementazione per la rilevazione del tono di un documento, valutato sul livello
    * di tale documento passato come parametro.
    * @abstract
    * @param {ArtLayer} livello - il livello del documento rispetto al quale il tono viene rilevato, tipicamente una tinta piatta.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla lettura delle quantità percentuali dei canali del documento.
    * @throws Lancia un errore quando invocato.
    * @returns {SolidColor}
    */
    rilevaTono: function(livello, campionatoreColore) {
        throw new Error(
            "Invocazione del metodo astratto rilevaTono(livello, campionatoreColore) di FiltroLetturaTonoAstratto."
        );
    },

    /**
    * Metodo senza implementazione per la validazione del tono passato come parametro, volta
    * a verificare che sia un tono valido e supportato dalla specifica implementazione del filtro.
    * @abstract
    * @param {SolidColor} tono - il tono da validare.
    * @throws Lancia un errore quando invocato.
    * @returns {boolean}
    */
    validaTono: function(tono) {
        throw new Error(
            "Invocazione del metodo astratto validaTono(tono) di FiltroLetturaTonoAstratto."
        );
    },

    /**
    * Metodo senza implementazione per la compilazione di una tabella dei toni
    * a partire dai toni dei documenti passati al filtro.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    _compilaTabellaToni: function() {
        throw new Error(
            "Invocazione del metodo astratto _compilaTabellaTonifunction() di FiltroLetturaTonoAstratto."
        );
    },

};