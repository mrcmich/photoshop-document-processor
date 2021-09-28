#include "../oggetti-minimi/FiltroAstratto.jsx"
#include "../estrazione-info-documento/EstrattoreNomeStandard.jsx"
#include "../estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"
#include "../posizionamento-livello/PosizionatoreLivello.jsx"

function FiltroSovrimpressione(parametriConfigurazione, estrattoreInfo, posizionatoreLivello) {
    this.__proto__ = FiltroAstratto;
    this._nome = "FiltroSovrimpressione";

    this.leggiNome = function() {
        return this._nome;
    };

    this.settaAzioneConfigurazione = function(parametriConfigurazione) {
        this._azioneConfigurazione = parametriConfigurazione.azioneConfigurazione;
    };

    this.settaSetAzioneConfigurazione = function(parametriConfigurazione) {
        this._setAzioneConfigurazione = parametriConfigurazione.setAzioneConfigurazione;
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
            throw new Error(
                "Invocazione del metodo esegui(documenti) di FiltroSovrimpressione con argomento documenti null o undefined."
            );
        }

        for (var i = 0; i < documenti.length; i++) {
            app.activeDocument = documenti[i];

            try {
                app.doAction(this._azioneConfigurazione, this._setAzioneConfigurazione);
            } catch (errore) {
                alert(
                    "Impossibile proseguire con la sovrimpressione:\n" +
                    "non è stato possibile eseguire l'azione " + this._azioneConfigurazione +
                    " dal set " + this._setAzioneConfigurazione + ". Verifica di aver definito l'azione.",
                    "Errore",
                    true
                );

                return;
            }
            
            livelloConfigurazione = documenti[i].artLayers[0];

            if (livelloConfigurazione.kind != LayerKind.TEXT) {
                alert(
                    "Impossibile proseguire con la sovrimpressione:\n" +
                    "nessun livello con campo di testo nel documento " + documenti[i].name + ". Verifica di aver impostato " +
                    "correttamente l'azione di configurazione " + this._azioneConfigurazione + ".",
                    "Errore",
                    true
                );

                return;
            }

            documenti[i].activeLayer = livelloConfigurazione;
            regioneLivelloConfigurazione = this._posizionatoreLivello.rilevaRegione(livelloConfigurazione);
            infoDocumento = this._estrattoreInfo.estraiInfo(documenti[i]);
            livelloConfigurazione.textItem.contents = infoDocumento;
            this._posizionatoreLivello.riposizionaLivello();
            documenti[i].mergeVisibleLayers();
            documenti[i].save();
        }
    };

    this.settaAzioneConfigurazione(parametriConfigurazione);
    this.settaSetAzioneConfigurazione(parametriConfigurazione);
    this.settaEstrattoreInfo(estrattoreInfo);
    this.settaPosizionatoreLivello(posizionatoreLivello);

}