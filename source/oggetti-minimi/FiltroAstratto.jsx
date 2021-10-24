/**
* Oggetto JavaScript che rappresenta l'astrazione di un filtro. 
* Deve essere settato come prototipo di un filtro, il quale deve implementarne i metodi.
* @interface
*/
var FiltroAstratto = {
    /**
    * Metodo senza implementazione per recuperare il nome del filtro.
    * Ogni filtro deve essere contraddistinto da un nome, che ne specifica la tipologia.
    * @abstract
    * @throws Lancia un errore quando invocato.
    * @returns {string}
    */
    leggiNome: function() {
        throw new Error(
            "Invocazione del metodo astratto leggiNome() di FiltroAstratto."
        );
    },

    /**
    * Metodo senza implementazione per l'esecuzione del filtro.
    * Il filtro si applica all'array' di documenti passato come parametro.
    * @abstract
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @throws Lancia un errore quando invocato.
    * @returns {undefined}
    */
    esegui: function(documenti) {
        throw new Error(
            "Invocazione del metodo astratto esegui() di FiltroAstratto."
        );
    },

};