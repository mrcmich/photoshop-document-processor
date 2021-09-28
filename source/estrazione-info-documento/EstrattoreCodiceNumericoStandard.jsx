#include "EstrattoreInfoAstratto.jsx"

function EstrattoreCodiceNumericoStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

    this.estraiInfo = function(documento) {
        if (documento == undefined) {
            throw new Error(
                "Invocazione del metodo estraiInfo(documento) di EstrattoreCodiceNumericoStandard " +
                "con argomento documento null o undefined."
            );
        }

        return (documento.name.split("_"))[0];
    };

}