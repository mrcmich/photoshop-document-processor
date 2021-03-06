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
    * Assume che il nome del documento sia in formato standard, del tipo "CN_STR.FFF" (con CN codice numerico intero, STR stringa costituita
    * di una o più parole separate dal carattere underscore e FFF estensione del documento).
    * @param {Document} documento - il documento di cui si vuole estrarre il codice numerico.
    * @throws Lancia un errore se il parametro passato è null o undefined, oppure se il nome del documento non è in formato standard.
    * @returns {string}
    */
    this.estraiInfo = function(documento) {
        var partiNomeDocumento;

        asserzione(
            documento != undefined, 
            "estraiInfo(documento)", 
            "EstrattoreCodiceNumericoStandard", 
            "documento null o undefined."
        );

        partiNomeDocumento = documento.name.split("_");

        asserzione(
            partiNomeDocumento.length >= 2, 
            "estraiInfo(documento)", 
            "EstrattoreCodiceNumericoStandard", 
            "documento con nome non in formato standard."
        );

        return partiNomeDocumento[0];
    };

}