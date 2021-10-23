//@include "../oggetti-minimi/FiltroAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"
//@include "../estrazione-info-documento/EstrattoreNomeStandard.jsx"
//@include "../estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"
//@include "../posizionamento-livello/PosizionatoreLivello.jsx"

/**
* Constructor function per la creazione di un filtro sovrimpressione, che gestisce
* la sovrimpressione di testo su di un documento. Demanda l'estrazione delle informazioni
* da sovrimprimere e il posizionamento del livello in cui vengono scritte tali informazioni a 
* due componenti esterni: estrattoreInfo e posizionatoreLivello. Le caratteristiche che tale testo
* deve avere (come font, colore, ecc.) sono definite mediante un'azione di Photoshop, individuata
* dall'oggetto parametriConfigurazione passato come parametro.
* @param {Object} parametriConfigurazione - oggetto con forma { azioneConfigurazione: "azione-conf", setAzioneConfigurazione: "set-azione-conf" }, 
*                                           per il passaggio dell'azione di configurazione.
* @param {EstrattoreInfoAstratto} estrattoreInfo - componente che gestisce l'estrazione di informazioni da sovrimprimere.
* @param {PosizionatoreLivelloAstratto} posizionatoreLivello - componente che gestisce il posizionamento delle informazioni sovrimpresse.
* @constructor
*/
function FiltroSovrimpressione(parametriConfigurazione, estrattoreInfo, posizionatoreLivello) {
    this.__proto__ = FiltroAstratto;

    /**
    * Attributo che identifica il tipo di filtro
    * @type {string}
    * @protected
    */
    this._nome = "FiltroSovrimpressione";

    /**
    * Attributo che identifica l'azione di configurazione richiamata dal filtro sovrimpressione 
    * per definire le caratteristiche del testo sovrimpresso.
    * @type {string}
    * @protected
    */
    this._azioneConfigurazione = null;

    /**
    * Attributo che identifica il set dell'azione di configurazione richiamata dal filtro sovrimpressione.
    * @type {string}
    * @protected
    */
    this._setAzioneConfigurazione = null;

    /**
    * Attributo che identifica l'estrattore di informazioni a cui il filtro sovrimpressione demanda 
    * l'estrazione di informazioni utili dai metadati dei documenti.
    * @type {EstrattoreInfoAstratto}
    * @protected
    */
    this._estrattoreInfo = null;

    /**
    * Attributo che identifica il posizionatore livello a cui il filtro sovrimpressione demanda 
    * il riposizionamento del campo di testo in cui le informazioni estratte da _estrattoreInfo sono inserite.
    * @type {PosizionatoreLivelloAstratto}
    * @protected
    */
    this._posizionatoreLivello = null;

    /**
    * Metodo getter per l'attributo _nome.
    * @returns {string}
    */
    this.leggiNome = function() {
        return this._nome;
    };

    /**
    * Metodo setter per l'attributo _azioneConfigurazione.
    * @param {Object} parametriConfigurazione - oggetto che individua l'azione di configurazione usata dal filtro sovrimpressione.
    * @throws Lancia un errore se parametriConfigurazione non ha azioneConfigurazione come chiave.
    * @returns {undefined}
    */
    this.settaAzioneConfigurazione = function(parametriConfigurazione) {
        asserzione(
            "azioneConfigurazione" in parametriConfigurazione, 
            "settaAzioneConfigurazione(parametriConfigurazione)", 
            "FiltroSovrimpressione", 
            "parametriConfigurazione non ha una proprietà azioneConfigurazione."
        );

        this._azioneConfigurazione = parametriConfigurazione.azioneConfigurazione;
    };

    /**
    * Metodo setter per l'attributo _setAzioneConfigurazione.
    * @param {Object} parametriConfigurazione - oggetto che individua l'azione di configurazione usata dal filtro sovrimpressione.
    * @throws Lancia un errore se parametriConfigurazione non ha setAzioneConfigurazione come chiave.
    * @returns {undefined}
    */
    this.settaSetAzioneConfigurazione = function(parametriConfigurazione) {
        asserzione(
            "setAzioneConfigurazione" in parametriConfigurazione, 
            "settaSetAzioneConfigurazione(parametriConfigurazione)", 
            "FiltroSovrimpressione", 
            "parametriConfigurazione non ha una proprietà setAzioneConfigurazione."
        );

        this._setAzioneConfigurazione = parametriConfigurazione.setAzioneConfigurazione;
    };

    /**
    * Metodo setter per l'attributo _estrattoreInfo.
    * @param {EstrattoreInfoAstratto} estrattoreInfo - componente che gestisce l'estrazione di informazioni da sovrimprimere.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @returns {undefined}
    */
    this.settaEstrattoreInfo = function(estrattoreInfo) {
        asserzione(
            estrattoreInfo != undefined, 
            "settaEstrattoreInfo(estrattoreInfo)", 
            "FiltroSovrimpressione", 
            "estrattoreInfo null o undefined."
        );

        this._estrattoreInfo = estrattoreInfo;
    };

    /**
    * Metodo setter per l'attributo _posizionatoreLivello.
    * @param {PosizionatoreLivelloAstratto} posizionatoreLivello - componente che gestisce il posizionamento delle informazioni sovrimpresse.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @returns {undefined}
    */
    this.settaPosizionatoreLivello = function(posizionatoreLivello) {
        asserzione(
            posizionatoreLivello != undefined, 
            "settaPosizionatoreLivello(posizionatoreLivello)", 
            "FiltroSovrimpressione", 
            "posizionatoreLivello null o undefined."
        );

        this._posizionatoreLivello = posizionatoreLivello;
    };

    /**
    * Metodo con cui il filtro sovrimpressione processa tutti i documenti dell'array omonimo passato come parametro.
    * @param {Array} documenti - array contenente i documenti da processare.
    * @throws Lancia un errore se il parametro passato è null o undefined, o se non è possibile portare a termine l'elaborazione.
    * @returns {undefined}
    */
    this.esegui = function(documenti) {
        var infoDocumento;
        var livelloConfigurazione;
        var regioneLivelloConfigurazione;

        asserzione(
            documenti != undefined, 
            "esegui(documenti)", 
            "FiltroSovrimpressione", 
            "documenti null o undefined."
        );

        for (var i = 0; i < documenti.length; i++) {
            livelloConfigurazione = null;
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
            
            for (var j = 0; j < documenti[i].artLayers.length; j++) {
                if (documenti[i].artLayers[j].kind == LayerKind.TEXT) {
                    livelloConfigurazione = documenti[i].artLayers[j];
                    break;
                }
            }

            if (livelloConfigurazione == null) {
                alert(
                    "Impossibile proseguire con la sovrimpressione:\n" +
                    "nessun livello con campo di testo nel documento " + documenti[i].name + 
                    ". Verifica di aver impostato correttamente l'azione di configurazione.",
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