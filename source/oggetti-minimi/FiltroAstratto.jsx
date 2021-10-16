/**
* Oggetto JavaScript che rappresenta l'astrazione di un filtro. 
* Deve essere settato come prototipo di un filtro, il quale deve implementarne i metodi.
* Vedi sorgente per i dettagli sui metodi da implementare.
*/
var FiltroAstratto = {

    /**
    * Metodo senza implementazione per l'esecuzione del filtro.
    * Il filtro si applica all'array' di documenti passato come parametro.
    * @abstract
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @throws {Error}
    */
    esegui: function(documenti) {
        throw new Error(
            "Invocazione del metodo astratto esegui() di FiltroAstratto."
        );
    },

};