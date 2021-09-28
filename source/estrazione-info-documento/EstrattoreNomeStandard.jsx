#include "EstrattoreInfoAstratto.jsx"

function EstrattoreNomeStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

    this.estraiInfo = function(documento) {
        var nomeCompletoDocumento;
        var posizioneSeparatoreFormato;

        if (documento == undefined) {
            throw new Error(
                "Invocazione del metodo estraiInfo(documento) di EstrattoreNomeStandard " +
                "con argomento documento null o undefined."
            );
        }

        return (documento.name.split("."))[0];
    };

}