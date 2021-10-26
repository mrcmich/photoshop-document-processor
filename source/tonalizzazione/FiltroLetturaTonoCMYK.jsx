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

    //
    this._documentiConTonoNonValido = [];

    this.validaDocumenti = function(documenti) {
        var documentiNonValidi = [];

        for (var i = 0; i < documenti.length; i++) {
            if (documenti[i].mode != DocumentMode.CMYK) {
                documentiNonValidi.push(documenti[i].name);
            }
        }

        return documentiNonValidi;
    };

    this.leggiDocumentiConTonoNonValido = function() {
        return this._documentiConTonoNonValido;
    };

    this.leggiTabellaToni = function() {
        return this._tabellaToni;
    };

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
            "i documenti " + documentiNonValidi.toString() + " hanno metodo colore diverso da CMYK."
        );

        this._documenti = documenti;
    };

    /**
    * Metodo per l'esecuzione del filtro lettura tono.
    * Il filtro si applica all'array di documenti passato come parametro.
    * @abstract
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @returns {undefined}
    */
    this.esegui = function(documenti) {
        try {
            this.settaDocumenti(documenti);
        } catch (errore) {
            alert(
                "Impossibile procedere: " + errore.description,
                "Errore",
                true
            );

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

    this.rilevaPercentualeCanale = function(livello, campionatoreColore, canale) {
        var coloreCampionato = campionatoreColore.color.cmyk;

        return Math.round(coloreCampionato[canale]);
    };

    /**
    * Metodo per la rilevazione del tono di un documento, valutato sul livello
    * di tale documento passato come parametro.
    * @abstract
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

    this.settaTabellaToni = function(tabellaToni) {
        asserzione(
            tabellaToni != undefined, 
            "settaTabellaToni(tabellaToni)", 
            "FiltroLetturaTonoCMYK", 
            "tabellaToni null o undefined."
        );

        this._tabellaToni = tabellaToni;
    };

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