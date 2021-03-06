//@include "EstrattoreInfoAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"

/**
* Constructor function per la creazione di un estrattore nome standard, che estrae dal 
* documento il suo nome, privato dell'estensione. 
* Ha EstrattoreInfoAstratto come prototipo.
* @constructor
*/
function EstrattoreNomeStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

    /**
    * Metodo per l'estrazione del nome del documento passato come parametro, privato dell'estensione.
    * Assume che il nome sia in formato standard, del tipo "CN_STR.FFF" (con CN codice numerico intero, STR stringa costituita
    * di una o più parole separate dal carattere underscore e FFF estensione del documento).
    * @param {Document} documento - il documento di cui si vuole estrarre il nome.
    * @throws Lancia un errore se il parametro passato è null o undefined, oppure se il nome del documento non è in formato standard.
    * @returns {string}
    */
    this.estraiInfo = function(documento) {
        var partiNomeDocumento;

        asserzione(
            documento != undefined, 
            "estraiInfo(documento)", 
            "EstrattoreNomeStandard", 
            "documento null o undefined."
        );

        partiNomeDocumento = documento.name.split(".");

        asserzione(
            partiNomeDocumento.length == 2, 
            "estraiInfo(documento)", 
            "EstrattoreNomeStandard", 
            "documento con nome non in formato standard."
        );

        return partiNomeDocumento[0];
    };

}
