#include "EstrattoreInfoAstratto.jsx"

function EstrattoreCodiceNumericoStandard(lunghezzaCodiceNumerico) {
    this.__proto__ = EstrattoreInfoAstratto;

    this.estraiInfo = function(documento) {
        var nomeCompletoDocumento;

        if (documento == undefined) {
            throw new Error(
                "Invocazione del metodo estraiInfo(documento) di EstrattoreCodiceNumericoStandard " +
                "con argomento documento null o undefined."
            );
        }

        nomeCompletoDocumento = documento.name;

        return nomeCompletoDocumento.substring(0, this._lunghezzaCodiceNumerico);
    };

    this.settaLunghezzaCodiceNumerico = function(lunghezzaCodiceNumerico) {
        lunghezzaCodiceNumerico = Math.round(Number(lunghezzaCodiceNumerico));

        if (lunghezzaCodiceNumerico <= 0) {
            throw new Error(
                "Invocazione del metodo settaLunghezzaCodiceNumerico(lunghezzaCodiceNumerico) di " +
                "EstrattoreCodiceNumericoStandard con argomento lunghezzaCodiceNumerico nullo o negativo."
            );
        }

        this._lunghezzaCodiceNumerico = lunghezzaCodiceNumerico;
    };

    this.leggiLunghezzaCodiceNumerico = function() {
        return this._lunghezzaCodiceNumerico;
    };

    this.settaLunghezzaCodiceNumerico(lunghezzaCodiceNumerico);

}