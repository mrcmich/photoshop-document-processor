//@include "EstrattoreInfoAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"

/**
* Constructor function per la creazione di un estrattore codice numerico standard, che estrae dal 
* documento il codice numerico che lo identifica.
* Ha EstrattoreInfoAstratto come prototipo.
* @constructor
*/
function EstrattoreCodiceNumericoStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

    /**
    * Metodo per l'estrazione del codice numerico del documento passato come parametro.
    * Assume che il nome del documento sia in formato standard, del tipo 
    * "codice-numerico-intero_parole-separate-da-underscore.estensione".
    * @param {Document} documento - il documento di cui si vuole estrarre il codice numerico.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @returns {string}
    */
    this.estraiInfo = function(documento) {
        asserzione(
            documento != undefined, 
            "estraiInfo(documento)", 
            "EstrattoreCodiceNumericoStandard", 
            "documento null o undefined."
        );

        return (documento.name.split("_"))[0];
    };

}