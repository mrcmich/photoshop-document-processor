/**
* Oggetto JavaScript che rappresenta l'astrazione di una pipeline. 
* Deve essere settato come prototipo di una pipeline, la quale deve implementarne i metodi.
* Si noti che ogni filtro di una pipeline deve essere identificato mediante un indice numerico.
* Vedi sorgente per i dettagli sui metodi da implementare.
*/
var PipelineAstratta = {

    /**
    * Metodo senza implementazione per l'aggiunta di un nuovo filtro alla pipeline.
    * @abstract
    * @param {FiltroAstratto} filtro - il filtro da aggiungere alla pipeline.
    * @throws {Error}
    */
    aggiungiFiltro: function(filtro) {
        throw new Error(
            "Invocazione del metodo astratto aggiungiFiltro(filtro) di PipelineAstratta."
        );
    },

    /**
    * Metodo senza implementazione per la rimozione di un filtro dalla pipeline.
    * @abstract
    * @param {number} indiceFiltro - l'indice del filtro da eliminare.
    * @throws {Error}
    */
    rimuoviFiltro: function(indiceFiltro) {
        throw new Error(
            "Invocazione del metodo astratto rimuoviFiltro(indiceFiltro) di PipelineAstratta."
        );
    },

    /**
    * Metodo senza implementazione per il ritorno di una stringa contenente l'elenco dei filtri
    * della pipeline, indicando per ciascuno il relativo indice.
    * @abstract
    * @returns {string}
    * @throws {Error}
    */
    elencoFiltri: function() {
        throw new Error(
            "Invocazione del metodo astratto elencoFiltri() di PipelineAstratta."
        );  
    },

    /**
    * Metodo senza implementazione per l'eliminazione di tutti i filtri della pipeline.
    * @abstract
    * @throws {Error}
    */
    svuota: function() {
        throw new Error(
            "Invocazione del metodo astratto svuota() di PipelineAstratta."
        );
    },

    /**
    * Metodo senza implementazione per l'esecuzione di tutti i filtri della pipeline.
    * @abstract
    * @throws {Error}
    */
    esegui: function() {
        throw new Error(
            "Invocazione del metodo astratto esegui() di PipelineAstratta."
        );
    },

    /**
    * Metodo senza implementazione per la concatenazione di pipeline: tutti i filtri della pipeline
    * passata come argomento vengono aggiunti in coda alla pipeline su cui il metodo è invocato.
    * Ritorna la pipeline ottenuta dalla concatenazione.
    * @abstract
    * @param {PipelineAstratta} pipeline - la pipeline da concatenare.
    * @returns {PipelineAstratta}
    * @throws {Error}
    */
    concatena: function(pipeline) {
         throw new Error(
            "Invocazione del metodo astratto concatena(pipeline) di PipelineAstratta."
        );
    },

};