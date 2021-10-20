/**
* Oggetto JavaScript che rappresenta l'astrazione di un estrattore di informazioni,
* ovvero di un oggetto che estrae informazioni di interesse dai metadati di un documento.
* Deve essere settato come prototipo di un estrattore di informazioni, il quale deve implementarne i metodi.
* @interface
*/
var EstrattoreInfoAstratto = {

    /**
    * Metodo senza implementazione per l'estrazione di informazioni, sotto forma di stringa,
    * dai metadati del documento passato come parametro.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @param {Document} documento - il documento da cui si vogliono estrarre informazioni.
    * @returns {string}
    */
    estraiInfo: function(documento) {
        throw new Error(
            "Invocazione del metodo astratto estraiInfo(documento) di EstrattoreInfoAstratto."
        );
    },
    
};