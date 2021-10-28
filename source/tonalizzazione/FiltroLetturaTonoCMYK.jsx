//@include "FiltroLetturaTonoAstratto.jsx"
//@include "../oggetti-minimi/Asserzione.jsx"
//@include "TabellaToniCMYK.jsx"
//@include "../gestione-io/ScrittoreTabellaToni.jsx"

/**
* Constructor function per la creazione di un filtro lettura tono CMYK, oggetto che 
* si occupa della rilevazione del tono di un set di documenti e della compilazione di una tabella dei toni,
* che viene poi visualizzata all'utente e salvata su file.
* Ha FiltroLetturaTonoAstratto come prototipo.
* @param {TabellaToniAstratta} tabellaToni - la tabella dei toni dei documenti, compilata dal filtro lettura tono.
* @param {ScrittoreFileAstratto} scrittoreTabellaToni - oggetto deputato al salvataggio della tabella dei toni su file.
* @constructor
*/
function FiltroLetturaTonoCMYK(tabellaToni, scrittoreTabellaToni) {
    this.__proto__ = FiltroLetturaTonoAstratto;

    /**
    * Array contenente i documenti che il filtro va a processare.
    * @type {Array}
    * @protected
    */
    this._documenti = null;

    /**
    * Array contenente il nome dei documenti con tono che il filtro non è in grado di gestire,
    * ovvero un tono per cui uno o più canali si trovino allo 0%.
    * @type {Array}
    * @protected
    */
    this._documentiConTonoNonValido = [];

    /**
    * Attributo che rappresenta la tabella dei toni che il filtro va a compilare con 
    * il tono dei documenti ad esso passati.
    * @type {TabellaToniAstratta}
    * @protected
    */
    this._tabellaToni = null;

    /**
    * Oggetto deputato al salvataggio su file della tabella dei toni compilata dal filtro.
    * @type {ScrittoreFileAstratto}
    * @protected
    */
    this._scrittoreTabellaToni = null;

    /**
    * Metodo per la validazione dell'array di documenti passato come parametro.
    * Sono considerati validi solo documenti con metodo colore CMYK.
    * Ritorna un array contenente il nome dei documenti non validi, o l'array vuoto se tutti i documenti sono validi.
    * @param {Array} documenti - array dei documenti da validare.
    * @returns {Array}
    */
    this.validaDocumenti = function(documenti) {
        var documentiNonValidi = [];

        for (var i = 0; i < documenti.length; i++) {
            if (documenti[i].mode != DocumentMode.CMYK) {
                documentiNonValidi.push(documenti[i].name);
            }
        }

        return documentiNonValidi;
    };

    /**
    * Metodo getter per l'attributo _documentiConTonoNonValido.
    * @returns {Array}
    */
    this.leggiDocumentiConTonoNonValido = function() {
        return this._documentiConTonoNonValido;
    };

    /**
    * Metodo getter per l'attributo _tabellaToni.
    * @returns {TabellaToniAstratta}
    */
    this.leggiTabellaToni = function() {
        return this._tabellaToni;
    };

    /**
    * Metodo setter per l'attributo _documenti.
    * @param {Array} documenti - documenti che il filtro deve processare.
    * @throws Lancia un errore se il parametro passato è null o undefined, o se contiene documenti non validi.
    * @returns {undefined}
    */
    this.settaDocumenti = function(documenti) {
        var documentiNonValidi;

        asserzione(
            documenti != undefined, 
            "settaDocumenti(documenti)", 
            "FiltroLetturaTonoCMYK", 
            "documenti null o undefined."
        );

        documentiNonValidi = this.validaDocumenti(documenti);

        asserzione(
            documentiNonValidi.length == 0, 
            "settaDocumenti(documenti)", 
            "FiltroLetturaTonoCMYK", 
            "i documenti " + documentiNonValidi.toString() + " hanno metodo colore diverso da CMYK.",
            documentiNonValidi
        );

        this._documenti = documenti;
    };

    /**
    * Metodo per l'esecuzione del filtro lettura tono.
    * Il filtro si applica all'array di documenti passato come parametro.
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @returns {undefined}
    */
    this.esegui = function(documenti) {
        var documentiNonValidi;

        try {
            this.settaDocumenti(documenti);
        } catch (errore) {
            if (errore.dati == undefined) {
                alert(
                    "Impossibile procedere: " + errore.description,
                    "Errore",
                    true
                );
            } else {
                alert(
                    "Impossibile procedere: i documenti " + 
                    errore.dati +
                    " hanno metodo colore diverso da CMYK.",
                    "Errore",
                    true
                );
            }

            return;
        }

        if (documenti.length == 0) {
            return;
        }

        this._compilaTabellaToni();
        this._tabellaToni.calcolaTonoMedio();
        beep();
        this._scrittoreTabellaToni.scriviSuFile(this._tabellaToni.toFile());

        alert(
            this._tabellaToni.toString(),
            "Tabella dei toni"
        );

    };

    /**
    * Metodo per la rilevazione della quantità percentuale del canale specificato, valutata sul livello
    * passato come parametro. Ritorna la quantità percentuale letta, arrotondata all'intero più vicino.
    * @param {ArtLayer} livello - il livello del documento rispetto al quale viene fatta la rilevazione, tipicamente una tinta piatta.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla lettura della quantità percentuale del canale.
    * @param {string} canale - il nome del canale oggetto della rilevazione, uno dei quattro canali CMYK (cyan, magenta, yellow, black).
    * @returns {number}
    */
    this.rilevaPercentualeCanale = function(livello, campionatoreColore, canale) {
        var coloreCampionato = campionatoreColore.color.cmyk;

        return Math.round(coloreCampionato[canale]);
    };

    /**
    * Metodo per la rilevazione del tono di un documento, valutato sul livello
    * di tale documento passato come parametro.
    * @param {ArtLayer} livello - il livello del documento rispetto al quale il tono viene rilevato, tipicamente una tinta piatta.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla lettura delle quantità percentuali dei canali del documento.
    * @returns {SolidColor}
    */
    this.rilevaTono = function(livello, campionatoreColore) {
        var tono = new SolidColor();

        tono.cmyk.cyan = this.rilevaPercentualeCanale(livello, campionatoreColore, "cyan");
        tono.cmyk.magenta = this.rilevaPercentualeCanale(livello, campionatoreColore, "magenta");
        tono.cmyk.yellow = this.rilevaPercentualeCanale(livello, campionatoreColore, "yellow");
        tono.cmyk.black = this.rilevaPercentualeCanale(livello, campionatoreColore, "black");

        return tono;
    };

    /**
    * Metodo per la validazione del tono passato come parametro.
    * Ritorna true se il tono passato è valido (cioè non è null/undefined e non contiene componenti pari allo 0%),
    * oppure false in caso contrario.
    * @param {SolidColor} tono - il tono da validare.
    * @returns {boolean}
    */
    this.validaTono = function(tono) {
         if (
            tono == undefined ||
            tono.cmyk.cyan == 0 ||
            tono.cmyk.magenta == 0||
            tono.cmyk.yellow == 0 ||
            tono.cmyk.black == 0
        ) {
            return false;
        }

        return true;
    };

    /**
    * Metodo per la compilazione della tabella dei toni del filtro.
    * Per ogni documento passato al filtro, viene rilevato il tono del documento, e questo tono
    * viene aggiunto alla tabella.
    * @returns {undefined}
    */
    this._compilaTabellaToni = function() {
        var tonoCorrente;
        var livelloRiferimento;
        var campionatoreColore;

        for (var i = 0; i < this._documenti.length; i++) {
            app.activeDocument = this._documenti[i];
            this._documenti[i].colorSamplers.add([new UnitValue(1, 'px'), new UnitValue(1, 'px')]);
            campionatoreColore = this._documenti[i].colorSamplers[this._documenti[i].colorSamplers.length - 1];
            livelloRiferimento = this._documenti[i].backgroundLayer.duplicate();
            this._documenti[i].activeLayer = livelloRiferimento;
            livelloRiferimento.applyAverage();
            tonoCorrente = this.rilevaTono(livelloRiferimento, campionatoreColore);

            if (!this.validaTono(tonoCorrente)) {
                this._documentiConTonoNonValido.push(this._documenti[i].name);
            }

            this._tabellaToni.aggiungiTono(this._documenti[i], tonoCorrente);
            this._documenti[i].colorSamplers.removeAll();
            livelloRiferimento.remove();
            this._documenti[i].save();
        }
    };

    /**
    * Metodo setter per l'attributo _tabellaToni.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @param {TabellaToniAstratta} tabellaToni - la tabella dei toni dei documenti, compilata dal filtro lettura tono.
    * @returns {undefined}
    */
    this.settaTabellaToni = function(tabellaToni) {
        asserzione(
            tabellaToni != undefined, 
            "settaTabellaToni(tabellaToni)", 
            "FiltroLetturaTonoCMYK", 
            "tabellaToni null o undefined."
        );

        this._tabellaToni = tabellaToni;
    };

    /**
    * Metodo setter per l'attributo _scrittoreTabellaToni.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @param {ScrittoreFileAstratto} scrittoreTabellaToni - oggetto deputato al salvataggio della tabella dei toni su file.
    * @returns {undefined}
    */
    this.settaScrittoreTabellaToni = function(scrittoreTabellaToni) {
        asserzione(
            scrittoreTabellaToni != undefined, 
            "settaScrittoreTabellaToni(scrittoreTabellaToni)", 
            "FiltroLetturaTonoCMYK", 
            "scrittoreTabellaToni null o undefined."
        );

        this._scrittoreTabellaToni = scrittoreTabellaToni;
    };

    this.settaTabellaToni(tabellaToni);
    this.settaScrittoreTabellaToni(scrittoreTabellaToni);

}