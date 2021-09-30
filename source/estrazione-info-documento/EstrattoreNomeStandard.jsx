#include "EstrattoreInfoAstratto.jsx"
#include "../oggetti-minimi/Asserzione.jsx"

function EstrattoreNomeStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

    this.estraiInfo = function(documento) {
        asserzione(
            documento != undefined, 
            "estraiInfo(documento)", 
            "EstrattoreNomeStandard", 
            "documento null o undefined."
        );

        return (documento.name.split("."))[0];
    };

}