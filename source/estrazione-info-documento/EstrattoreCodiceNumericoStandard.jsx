function EstrattoreCodiceNumericoStandard(lunghezzaCodiceNumerico) {
    this.__proto__ = EstrattoreInfoAstratto;

    this.estraiInfo = function(documento) {
        var nomeCompletoDocumento;

        if (documento == undefined) {
            throw new TypeError(
                `Invocazione del metodo estraiInfo(documento) di EstrattoreCodiceNumericoStandard
                con argomento documento null o undefined.`
            );
        }

        nomeCompletoDocumento = documento.name;

        return nomeCompletoDocumento.substring(0, this._lunghezzaCodiceNumerico);
    };

    this.settaLunghezzaCodiceNumerico(lunghezzaCodiceNumerico) {
        lunghezzaCodiceNumerico = Math.trunc(Number(lunghezzaCodiceNumerico));

        if (lunghezzaCodiceNumerico <= 0) {
            throw new SyntaxError(
                `Invocazione del metodo settaLunghezzaCodiceNumerico(lunghezzaCodiceNumerico) di EstrattoreCodiceNumericoStandard
                con argomento lunghezzaCodiceNumerico nullo o negativo.`
            );
        }

        this._lunghezzaCodiceNumerico = lunghezzaCodiceNumerico;
    };

    this.leggiLunghezzaCodiceNumerico() {
        return this._lunghezzaCodiceNumerico;
    };

    this.settaLunghezzaCodiceNumerico(lunghezzaCodiceNumerico);

}