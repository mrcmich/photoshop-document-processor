//@include "PipelineAstratta.jsx"
//@include "Asserzione.jsx"

/**
* Constructor function per la creazione di una nuova pipeline, che applicherà i filtri di cui
* è composta ai documenti passati come parametro. Ha PipelineAstratta come prototipo.
* @param {Array} documenti - array contenente i documenti che la pipeline deve processare.
* @constructor
*/
function Pipeline(documenti) {
    this.__proto__ = PipelineAstratta;

    /**
    * Array contenente i filtri di cui si compone la pipeline.
    * @type {Array}
    * @protected
    */
    this._filtri = [];

    /**
    * Metodo setter per i documenti della pipeline.
    * @param {Array} documenti - array contenente i nuovi documenti che la pipeline deve processare.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    */
    this.settaDocumenti = function(documenti) {
        asserzione(
            documenti != undefined, 
            "settaDocumenti(documenti)", 
            "Pipeline", 
            "documenti null o undefined."
        );

        this._documenti = documenti;
    };

    /**
    * Metodo per l'aggiunta di un nuovo filtro alla pipeline.
    * @param {FiltroAstratto} filtro - il filtro da aggiungere alla pipeline.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    */
    this.aggiungiFiltro = function(filtro) {
         asserzione(
            filtro != undefined, 
            "aggiungiFiltro(filtro)", 
            "Pipeline", 
            "filtro null o undefined."
        );

        this._filtri.push(filtro);
    };

    /**
    * Metodo per la rimozione di un filtro dalla pipeline. Se l'indice passato non è intero, viene arrotondato
    * all'intero più vicino. Un indice passato sotto forma di stringa viene prima convertito in number.
    * @param {number} indiceFiltro - l'indice del filtro da eliminare, corrispondente alla sua posizione nell'array _filtri.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    */
    this.rimuoviFiltro = function(indiceFiltro) {
        asserzione(
            indiceFiltro != undefined, 
            "aggiungiFiltro(filtro)", 
            "Pipeline", 
            "filtro null o undefined."
        );

        indiceFiltro = Math.round(Number(indiceFiltro));

        if (indiceFiltro < 0 || indiceFiltro >= this._filtri.length) {
            return;
        }

        this._filtri.splice(indiceFiltro, 1);
    };

    /**
    * Metodo getter per i filtri di cui si compone la pipeline.
    * @returns {Array}
    */
    this.leggiFiltri = function() {
        return this._filtri;
    }

    /**
    * Metodo per il ritorno di una stringa contenente l'elenco dei filtri
    * della pipeline, indicando per ciascuno il relativo indice.
    * @returns {string}
    */
    this.elencoFiltri = function() {
        var elencoFiltri = "";

        if (this._filtri.length == 0) {
            return "{ }";
        }

        elencoFiltri += "{ ";

        for (var i = 0; i < this._filtri.length; i++) {
            elencoFiltri += (i + ": " + this._filtri[i].leggiNome());

            if (i != this._filtri.length - 1) {
                elencoFiltri += ", ";
            }
        }

        elencoFiltri += " }";

        return elencoFiltri;
    };

    /**
    * Metodo per l'eliminazione di tutti i filtri della pipeline.
    */
    this.svuota = function() {
        this._filtri.length = 0;
    };

    /**
    * Metodo per l'esecuzione di tutti i filtri della pipeline.
    * Terminata l'elaborazione dei documenti, l'utente viene avvisato tramite un suono e
    * una finestra di dialogo.
    */
    this.esegui = function() {   
        if (this._documenti.length != 0) {
            for (var i = 0; i < this._filtri.length; i++) {
                this._filtri[i].esegui(this._documenti);
            }
        }

        beep();
        alert("Elaborazioni terminate. Controlla i documenti processati.", "Elaborazioni terminate");
        
    };

    /**
    * Metodo per la concatenazione di pipeline: tutti i filtri della pipeline
    * passata come argomento vengono aggiunti in coda alla pipeline su cui il metodo è invocato.
    * Ritorna la pipeline ottenuta dalla concatenazione.
    * @param {PipelineAstratta} pipeline - la pipeline da concatenare.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @returns {PipelineAstratta}
    */
    this.concatena = function(pipeline) {
        var filtriAccodati; 

        asserzione(
            pipeline != undefined, 
            "concatena(pipeline)", 
            "Pipeline", 
            "pipeline null o undefined."
        );

        filtriAccodati = pipeline.leggiFiltri();

        if (filtriAccodati.length == 0) {
            return this;
        }

        for (var i = 0; i < filtriAccodati.length; i++) {
            this.aggiungiFiltro(filtriAccodati[i]);
        }

        return this;
    };

    this.settaDocumenti(documenti);

}