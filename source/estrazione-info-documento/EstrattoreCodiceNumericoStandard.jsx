#include "EstrattoreInfoAstratto.jsx"
#include "../oggetti-minimi/Asserzione.jsx"

function EstrattoreCodiceNumericoStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

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