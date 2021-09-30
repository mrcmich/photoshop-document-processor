#include "../oggetti-minimi/Asserzione.jsx"
#include "FiltroTonalizzazioneAstratto.jsx"
#include "../gestione-io/ScrittoreFileTestuale.jsx"

function FiltroTonalizzazioneCMYK(tabellaToni, scrittoreFileTestuale) {
    this.__proto__ = FiltroTonalizzazioneAstratto;

    this.settaTabellaToni = function(tabellaToni) {
        asserzione(
            tabellaToni != undefined, 
            "settaTabellaToni(tabellaToni)", 
            "FiltroTonalizzazioneCMYK", 
            "tabellaToni null o undefined."
        );

        this._tabellaToni = tabellaToni;
    };

    this.settaScrittoreFileTestuale = function(scrittoreFileTestuale) {
         asserzione(
            scrittoreFileTestuale != undefined, 
            "settaScrittoreFileTestuale(scrittoreFileTestuale)", 
            "FiltroTonalizzazioneCMYK", 
            "scrittoreFileTestuale null o undefined."
        );

        this._scrittoreFileTestuale = scrittoreFileTestuale;
    };

    // Opera sul livello attivo del documento passato come parametro
    this._rilevaTono = function(documento) {
        var tono = new SolidColor().cmyk;
        var campionatoreColore = documento.colorSamplers.add([new UnitValue(0, 'px'), new UnitValue(0, 'px')]);

        tono.cyan = Math.round(campionatoreColore.color.cmyk.cyan);
        tono.magenta = Math.round(campionatoreColore.color.cmyk.magenta);
        tono.yellow = Math.round(campionatoreColore.color.cmyk.yellow);
        tono.black = Math.round(campionatoreColore.color.cmyk.black);
        documento.colorSamplers.removeAll();

        return tono;
    };

    this._determinaTonoRiferimento = function() {
        
    };

    // Esternamente aggiungere controllo documenti allo 0%
    this._calcolaFattoriTonalizzazione = function(documento, tonoRiferimento) {
        var tono;
        
        var stimaFattoriTonalizzazione = new SolidColor().cmyk;

        if (tonoRiferimento == undefined) {
            throw new Error(
                "Invocazione del metodo _calcolaFattoriTonalizzazione(documento, tono) " +
                "di FiltroTonalizzazioneCMYK con argomento tonoRiferimento null o undefined."
            );
        }

        tono = this._rilevaTono(documento);
        
        stimaFattoriTonalizzazione.cyan = Math.round((tonoRiferimento.cyan * 100) / tono.cyan);
        stimaFattoriTonalizzazione.magenta = Math.round((tonoRiferimento.magenta * 100) / tono.magenta);
        stimaFattoriTonalizzazione.yellow = Math.round((tonoRiferimento.yellow * 100) / tono.yellow);
        stimaFattoriTonalizzazione.black = Math.round((tonoRiferimento.black * 100) / tono.black);

        if (
            fixChannelValues_v2(document, 0, referenceValues, deltaValues) &&
            fixChannelValues_v2(document, 1, referenceValues, deltaValues) &&
            fixChannelValues_v2(document, 2, referenceValues, deltaValues) &&
            fixChannelValues_v2(document, 3, referenceValues, deltaValues)
        ) {
            mixChannelValues_CMYK(document.activeLayer, deltaValues);
            $.writeln("Bilanciato " + document.name);
        }

    };

    this._bilanciaTonoDocumento = function(documento, tonoRiferimento) {
         if (tonoRiferimento == undefined || tonoRiferimento.cmyk == undefined) {
            throw new Error(
                "Invocazione del metodo _calcolaFattoriTonalizzazione(documento, tono) " +
                "di FiltroTonalizzazioneCMYK con argomento tono null, undefined o non CMYK."
            );
        }
    };

    // Aggiungi controllo canali allo 0%
    this.esegui = function(documenti) {
        var tonoIniziale;
        var livelloRiferimento;
        var statoInizialeDocumento;
        var tabellaToniFormattata;
        var nomeDocumentiNonConformi;

        asserzione(
            documenti != undefined, 
            "esegui(documenti)", 
            "FiltroTonalizzazioneCMYK", 
            "documenti null o undefined."
        );

        nomeDocumentiNonConformi = this._elencoDocumentiNonCMYK(documenti);

        if (nomeDocumentiNonConformi.length != 0) {
            alert(
                "Impossibile procedere con la tonalizzazione: i documenti " +
                nomeDocumentiNonConformi.toString() + " non usano il metodo colore CMYK.",
                "Errore di formato documenti.", 
                true
            );

            return;
        }

        this._applicaSfocaturaMedia(documenti);
        nomeDocumentiNonConformi = this._compilaTabellaToni(documenti);

        if (nomeDocumentiNonConformi.length != 0) {
            alert(
                "Impossibile procedere con la tonalizzazione: i documenti " +
                nomeDocumentiNonConformi.toString() + " hanno uno o più canali allo 0%.",
                "Errore di formato documenti.", 
                true
            );

            return;
        }

        this._tabellaToni.calcolaTonoMedio();
        tabellaToniFormattata = this._tabellaToni.toString();
        beep();
        alert(
            tabellaToniFormattata,
            "Tabella dei toni"
        );
        this._scrittoreFileTestuale.scriviSuFile(tabellaToniFormattata);
        
        // determinazione tono riferimento

        // bilancio tono documenti
        // che comprende calcolo del riferimento in base all'input, calcolo dei fattori di tonalizzazione, applicazione dei fattori
       
        for (var i = 0; i < documenti.length; i++) {
            documenti[i].activeLayer.remove();
            documenti[i].mergeVisibleLayers();
            documenti[i].save();
        }
        
    };

    // Come effetto secondario, imposta i duplicati dei livelli di sfondo come livelli attivi dei documenti
    this._applicaSfocaturaMedia(documenti) {
        var livelloRiferimento;

        for (var i = 0; i < documenti.length; i++) {
            app.activeDocument = documenti[i];
            documenti[i].activeLayer = documenti[i].backgroundLayer;
            livelloRiferimento = documenti[i].activeLayer.duplicate();
            livelloRiferimento.applyAverage();
        }
    };

    // Lavora sui livelli attivi di ogni documento
    // Ritorna la lista dei documenti con canali allo 0%
    this._compilaTabellaToni = function(documenti) {
        var tono;
        var nomeDocumentiNonConformi = [];

        for (var i = 0; i < documenti.length; i++) {
            app.activeDocument = documenti[i];
            tono = this._rilevaTono(documento[i]);

            if (this._tonoConCanaliNulli(tono)) {
                nomeDocumentiNonConformi.push(documenti[i].name);
            }

            this._tabellaToni.aggiungiTono(documento[i], tono);
        }

        return nomeDocumentiNonConformi;
    };

    this._tonoConCanaliNulli(tono) {
        if (
            tono.cyan == 0 ||
            tono.magenta == 0||
            tono.yellow == 0 ||
            tono.black == 0
        ) {
            return true;
        }

        return false;
    }

    // Ritorna un array contenente i documenti con metodo colore diverso CMYK
    this._elencoDocumentiNonCMYK = function(documenti) {
        var nomeDocumentiNonCMYK = [];

        for (var i = 0; i < documenti.length; i++) {
            if (documenti[i].mode != DocumentMode.CMYK) {
                nomeDocumentiNonCMYK.push(documenti[i].name);
            }
        }

        return nomeDocumentiNonCMYK;
    };

    this.settaTabellaToni(tabellaToni);
    this.settaScrittoreFileTestuale(scrittoreFileTestuale);

}