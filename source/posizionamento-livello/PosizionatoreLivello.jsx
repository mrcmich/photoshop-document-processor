//@include "PosizionatoreLivelloAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"

/**
* Constructor function per la creazione di un posizionatore livello, oggetto che permette di
* rilevare la regione di appartenenza di un livello nel suo documento e anche riposizionarlo all'interno di una specificata regione,
* lasciando un opportuno margine dai bordi.
* Ha PosizionatoreLivelloAstratto come prototipo.
* @param {number} margine - il margine da lasciare rispetto al bordo superiore e a quello cui il livello viene allineato.
* @constructor
*/
function PosizionatoreLivello(margine) {
    this.__proto__ = PosizionatoreLivelloAstratto;

    /**
    * Il livello su cui opera il posizionatore.
    * @type {ArtLayer}
    * @protected
    */
    this._livello = null;

    /**
    * La regione settata per il livello attualmente assegnato al posizionatore,
    * presa dalle costanti definite da PosizionatoreLivelloAstratto.
    * @type {number}
    * @protected
    */
    this._regioneLivello = null;

    /**
    * Il margine attualmente settato per il posizionatore, usato nell'allineamento di un livello.
    * @type {number}
    * @protected
    */
    this._margine = null;

    /**
    * Metodo setter per il livello del posizionatore.
    * @param {ArtLayer} livello - il livello che il posizionatore deve riposizionare.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @returns {undefined}
    */
    this.settaLivello = function(livello) {
        asserzione(
            livello != undefined, 
            "settaLivello(livello)", 
            "PosizionatoreLivello", 
            "livello null o undefined."
        );

        this._livello = livello;
    };

    /**
    * Metodo getter per l'attributo _regioneLivello.
    * @returns {number}
    */
    this.leggiRegioneLivello = function() {
        return this._regioneLivello;
    };

    /**
    * Metodo setter per l'attributo _margine.
    * Assume che il parametro margine sia un numero o al più una stringa numerica (convertita in number).
    * @param {number} margine - il margine che il posizionatore deve applicare nel riposizionamento.
    * @throws Lancia un errore se viene passato un margine negativo.
    * @returns {undefined}
    */
    this.settaMargine = function(margine) {
        margine = (margine == undefined) ? this._MARGINE_DEFAULT : Number(margine);

        asserzione(
            margine >= 0, 
            "settaMargine(margine)", 
            "PosizionatoreLivello", 
            "margine negativo."
        );

        this._margine = margine;
    };

    /**
    * Metodo getter per l'attributo _margine.
    * @returns {number}
    */
    this.leggiMargine = function() {
        return this._margine;
    };

    /**
    * Metodo getter per l'attributo _MARGINE_DEFAULT (ereditato da PosizionatoreLivelloAstratto).
    * @returns {number}
    */
    this.leggiMargineDefault = function() {
        return this._MARGINE_DEFAULT;
    };

    /**
    * Metodo per la rilevazione della regione di appartenenza del livello passato come parametro.
    * Le possibili regioni sono quelle date dalle costanti _REGIONE_SINISTRA, _REGIONE_CENTRALE, _REGIONE_DESTRA
    * ereditate da PosizionatoreLivelloAstratto. Notare che la regione non viene restituita, piuttosto viene settato
    * l'attributo _regioneLivello (così come l'attributo _livello).
    * @param {ArtLayer} livello - il livello di cui si vuole determinare la regione.
    * @returns {undefined}
    */
    this.rilevaRegione = function(livello) {
        var bordiLivello;
        var larghezzaDocumento;
        var ascissaMediaLivello;
        
        this.settaLivello(livello);
        bordiLivello = livello.bounds;
        larghezzaDocumento = livello.parent.width.value;
        ascissaMediaLivello = Math.round((bordiLivello[0].value + bordiLivello[2].value) / 2);

        if (ascissaMediaLivello < Math.round(larghezzaDocumento / 3)) {
		    this._regioneLivello = this._REGIONE_SINISTRA;
	    } else if (ascissaMediaLivello >= Math.round((2/3) * larghezzaDocumento)) {
		    this._regioneLivello = this._REGIONE_DESTRA;
	    } else {
            this._regioneLivello = this._REGIONE_CENTRALE;
        }

    };

    /**
    * Metodo per il riposizionamento di _livello.
    * Il riposizionamento avviene secondo il valore di _regioneLivello e _margine, come
    * definito dai due metodi interni _allineaVerticalmenteLivello e _allineaOrizzontalmenteLivello.
    * Se almeno uno dei suddetti attributi è null/undefined, il metodo non fa nulla. Si noti che il margine
    * massimo è imposto pari al 20% della dimensione più piccola del documento, e che un margine superiore a tale
    * valore viene riportato al massimo.
    *
    * N.B. Il metodo usa le unità di misura attualmente impostate per i righelli in Photoshop.
    * @returns {undefined}
    */
    this.riposizionaLivello = function() {
        var margineMax;
        var margine = this._margine;
        
        if (this._livello == undefined || this._regioneLivello == undefined) {
            return;
        }

        margineMax = 0.20 * Math.min(this._livello.parent.width.value, this._livello.parent.height.value);

        if (this._margine > margineMax) {
            margine = margineMax;
        }

        this._allineaVerticalmenteLivello(margine);
        this._allineaOrizzontalmenteLivello(margine);
    };

    /**
    * Metodo per l'allineamento verticale di _livello, invocato internamente a riposizionaLivello().
    * Il livello _livello viene allineato al bordo superiore del documento, lasciando un margine pari a margine.
    * Si osservi che questo metodo assume che gli attributi _livello e _regioneLivello siano definiti e 
    * che si abbia 0 <= margine <= margineMax, dove margineMax è imposto pari al 20% della dimensione più piccola del documento.
    *
    * N.B. Il metodo usa le unità di misura attualmente impostate per i righelli in Photoshop.
    * @protected
    * @returns {undefined}
    */
    this._allineaVerticalmenteLivello = function(margine) {
        var bordiLivello;
        var ordinataMinimaLivello;

        bordiLivello = this._livello.bounds;
        ordinataMinimaLivello = bordiLivello[1].value;
        this._livello.translate(0, margine - ordinataMinimaLivello);
    };

    /**
    * Metodo per l'allineamento orizzontale di _livello, invocato internamente a riposizionaLivello().
    * Il livello _livello viene allineato:
    *   - al bordo sinistro, lasciando un margine pari a margine, se _regioneLivello == _REGIONE_SINISTRA
    *   - al centro se _regioneLivello == _REGIONE_CENTRALE
    *   - al bordo destro, lasciando un margine pari a margine, se _regioneLivello == _REGIONE_DESTRA
    * Si osservi che questo metodo assume che gli attributi _livello e _regioneLivello siano definiti e 
    * che si abbia 0 <= margine <= margineMax, dove margineMax è imposto pari al 20% della dimensione più piccola del documento.
    *
    * N.B. Il metodo usa le unità di misura attualmente impostate per i righelli in Photoshop.
    * @protected
    * @returns {undefined}
    */
    this._allineaOrizzontalmenteLivello = function(margine) {
        var bordiLivello;
        var larghezzaDocumento;
        var ascissaMinimaLivello;
        var ascissaMassimaLivello;

        bordiLivello = this._livello.bounds;
        larghezzaDocumento = this._livello.parent.width.value;
        ascissaMinimaLivello = bordiLivello[0].value;
        ascissaMassimaLivello = bordiLivello[2].value;

        if (this._regioneLivello == this._REGIONE_SINISTRA) {
		    this._livello.translate(margine - ascissaMinimaLivello, 0);
	    } else if (this._regioneLivello == this._REGIONE_DESTRA) {
            this._livello.translate(larghezzaDocumento - margine - ascissaMassimaLivello, 0);
	    } else if (this._regioneLivello == this._REGIONE_CENTRALE) {
            this._livello.translate((larghezzaDocumento - ascissaMinimaLivello - ascissaMassimaLivello) / 2, 0);
	    }

    };

    this.settaMargine(margine);

}
