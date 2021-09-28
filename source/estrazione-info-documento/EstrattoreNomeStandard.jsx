function EstrattoreNomeStandard() {
    this.__proto__ = EstrattoreInfoAstratto;

    this.estraiInfo = function(documento) {
        var nomeCompletoDocumento;
        var posizioneSeparatoreFormato;

        if (documento == undefined) {
            throw new TypeError(
                `Invocazione del metodo estraiInfo(documento) di EstrattoreNomeStandard
                con argomento documento null o undefined.`
            );
        }

        nomeCompletoDocumento = documento.name;
        posizioneSeparatoreFormato = nomeCompletoDocumento.lastIndexOf(".", 0);

        return nomeCompletoDocumento.substring(0, posizioneSeparatoreFormato);
    };

}