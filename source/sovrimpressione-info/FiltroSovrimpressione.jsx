function FiltroSovrimpressione(oggettoConfigurazione, estrattoreInfo, posizionatoreLivello) {
    this.__proto__ = FiltroAstratto;
    this._nome = "FiltroSovrimpressione";

    this.leggiNome = function() {
        return this._nome;
    };

    this.settaAzioneConfigurazione = function(oggettoConfigurazione) {
        // Inserisci controllo su azione

        this._azioneConfigurazione = oggettoConfigurazione.azione;
    };

    this.settaSetAzioneConfigurazione = function(oggettoConfigurazione) {
        // Inserisci controllo su set azione

        this._setAzioneConfigurazione = oggettoConfigurazione.set;
    };

    this.settaEstrattoreInfo = function(estrattoreInfo) {
        this._estrattoreInfo = estrattoreInfo;
    };

    this.settaPosizionatoreLivello = function(posizionatoreLivello) {
        this._posizionatoreLivello = posizionatoreLivello;
    };

    this.esegui = function(documenti) {
        var infoDocumento;
        var livelloConfigurazione;
        var regioneLivelloConfigurazione;

        if (documenti == undefined) {
            throw new TypeError(
                `Invocazione del metodo esegui(documenti) di FiltroSovrimpressione
                con argomento documenti null o undefined.`
            );
        }

        for (var documento of documenti) {
            app.activeDocument = documento;
            app.doAction(this._azioneConfigurazione, this._setAzioneConfigurazione);
            livelloConfigurazione = documento.artLayers[0];

            if (livelloConfigurazione.kind != LayerKind.TEXT) {
                alert(
                    `Impossibile proseguire con la sovrimpressione:
                    nessun livello con campo di testo nel documento ${documento.name}. Verifica di aver impostato correttamente
                    l'azione di configurazione ${this._azioneConfigurazione}.`
                );

                return;
            }

            documento.activeLayer = livelloConfigurazione;
            regioneLivelloConfigurazione = this._posizionatoreLivello.rilevaRegione(livelloConfigurazione);
            infoDocumento = this._estrattoreInfo.estraiInfo(documento);
            livelloConfigurazione.textItem.contents = infoDocumento;
            this._posizionatoreLivello.riposizionaLivello();
            documento.mergeVisibileLayers();
            documento.save();
        }
    };

    this.settaAzioneConfigurazione(oggettoConfigurazione);
    this.settaSetAzioneConfigurazione(oggettoConfigurazione);
    this.settaEstrattoreInfo(estrattoreInfo);
    this.settaPosizionatoreLivello(posizionatoreLivello);

}