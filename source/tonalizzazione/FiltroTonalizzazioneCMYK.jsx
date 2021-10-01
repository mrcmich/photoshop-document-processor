#include "../oggetti-minimi/Asserzione.jsx"
#include "FiltroTonalizzazioneAstratto.jsx"
#include "FiltroLetturaTonoCMYK.jsx"

function FiltroTonalizzazioneCMYK(filtroLetturaTonoCMYK) {
    this.__proto__ = FiltroTonalizzazioneAstratto;
    this._canaliUscitaMiscelatore = [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
    ];

    this.settaFiltroLetturaTonoCMYK = function(filtroLetturaTonoCMYK) {
        asserzione(
            filtroLetturaTonoCMYK != undefined, 
            "settaFiltroLetturaTonoCMYK(filtroLetturaTonoCMYK)", 
            "FiltroTonalizzazioneCMYK", 
            "filtroLetturaTonoCMYK null o undefined."
        );

        this._filtroLetturaTonoCMYK = filtroLetturaTonoCMYK;
    };

    // Ritorna un oggetto con proprietà cyan, magenta, yellow, black
    // oppure undefined se premuto "Cancella"
    this._determinaTonoRiferimento = function(tonoDefault) {
        var riferimentiUtente;

        riferimentiUtente.cyan = this._determinaRiferimentoCanale("Ciano", tonoDefault.cyan);

        if (riferimentiUtente.cyan == undefined) {
            return;
        }

        riferimentiUtente.magenta = this._determinaRiferimentoCanale("Magenta", tonoDefault.magenta);

        if (riferimentiUtente.magenta == undefined) {
            return;
        }

        riferimentiUtente.yellow = this._determinaRiferimentoCanale("Giallo", tonoDefault.yellow);

        if (riferimentiUtente.yellow == undefined) {
            return;
        }

        riferimentiUtente.black = this._determinaRiferimentoCanale("Nero", tonoDefault.black);

        if (riferimentiUtente.black == undefined) {
            return;
        }

        return riferimentiUtente;
    };

    // Ritorna un array con il riferimento (valore o range) oppure undefined se premuto cancella
    this._determinaRiferimentoCanale = function(canale, riferimentoDefault) {
        var input;
        var riferimento = [];

        while (true) {
            input = prompt("Inserisci riferimento " + canale + ":", riferimentoDefault, "Riferimento " + canale);

            if (input == null) {
                return;
            }

            input = input.split("-");

            if (input.length == 0 || input.length > 2) {
                alert(
                    "Riferimento non valido: inserisci un singolo valore numerico oppure un intervallo nella forma min-max.", 
                    "Riferimento non valido"
                );

                continue;
            }

            if (input.length == 1) {
                if (!this._validaPercentualeCanale(input[0])) {
                    alert(
                    "Riferimento non valido: inserisci una quantità percentuale.", 
                    "Riferimento non valido"
                    );

                    continue;
                }

                riferimento.push(Math.round(Number(input[0])));
                break;
            } 

            if (!this._validaPercentualeCanale(input[0]) || !this._validaPercentualeCanale(input[1])) {
                alert(
                    "Riferimento non valido: inserisci un intervallo di quantità percentuali nella forma min-max.", 
                    "Riferimento non valido"
                );

                continue;
            }

            riferimento.push(Math.round(Number(input[0])));
            riferimento.push(Math.round(Number(input[1])));
            break;
        }

        return riferimento;
    };

    this._validaPercentualeCanale = function(stringaPercentuale) {
        var percentuale;

        if (
            stringaPercentuale == null ||
            "NaN" == String(Number(stringaPercentuale))
        ) {
            return false;
        }

        percentuale = Number(stringaPercentuale);

        if (percentuale < 0 || percentuale > 100) {
            return false;
        }

        return true;
    }

    // ritorna undeinfed se non è possibile tonalizzare
    this._calcolaFattoriTonalizzazione = function(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore) {
        var fattoriTonalizzazione = new SolidColor().cmyk;

        if (tonoIniziale == undefined) {
            tonoIniziale = this._filtroLetturaTonoCMYK.rilevaTono(livelloRiferimento, campionatoreColore);
        }

        fattoriTonalizzazione.cyan = Math.round((tonoRiferimento.cyan * 100) / tono.cyan);
        fattoriTonalizzazione.magenta = Math.round((tonoRiferimento.magenta * 100) / tono.magenta);
        fattoriTonalizzazione.yellow = Math.round((tonoRiferimento.yellow * 100) / tono.yellow);
        fattoriTonalizzazione.black = Math.round((tonoRiferimento.black * 100) / tono.black);

        if (
            this._calcolaFattoreCanale(livelloRiferimento, "cyan", tonoRiferimento.cyan, fattoriTonalizzazione, campionatoreColore) ||
            this._calcolaFattoreCanale(livelloRiferimento, "magenta", tonoRiferimento.magenta, fattoriTonalizzazione, campionatoreColore) ||
            this._calcolaFattoreCanale(livelloRiferimento, "yellow", tonoRiferimento.yellow, fattoriTonalizzazione, campionatoreColore) ||
            this._calcolaFattoreCanale(livelloRiferimento, "black", tonoRiferimento.black, fattoriTonalizzazione, campionatoreColore)
        ) {
            return;
        }
  
        return fattoriTonalizzazione;
    };

    this._applicaMiscelatoreCanale = function(livello, canaliUscita, fattoriTonalizzazione) {
        canaliUscita[0][0] = fattoriTonalizzazione.cyan;
        canaliUscita[1][1] = fattoriTonalizzazione.magenta;
        canaliUscita[2][2] = fattoriTonalizzazione.yellow;
        canaliUscita[3][3] = fattoriTonalizzazione.black;

        livello.mixChannels(canaliUscita);
    };

    this._calcolaFattoreCanale = function(livelloRiferimento, canale, riferimentoCanale, fattoriTonalizzazione, campionatoreColore) {
        var incremento;
        var percentualeCanale;
        var statoInizialeDocumento;
    
        statoInizialeDocumento = livelloRiferimento.parent.activeHistoryState;
        this._applicaMiscelatoreCanale(livelloRiferimento, this._canaliUscitaMiscelatore, fattoriTonalizzazione);
        percentualeCanale = this._filtroLetturaTonoCMYK.rilevaPercentualeCanale(livelloRiferimento, campionatoreColore, canale);
        livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;
        
        if (percentualeCanale == riferimentoCanale) {
            return true;
        }
    
        incremento = (percentualeCanale > riferimentoCanale) ? -1 : 1;
        
        do {
            fattoriTonalizzazione[canale] += incremento;
            
            if (fattoriTonalizzazione[canale] < 0 || fattoriTonalizzazione[canale] > 200) {
                beep();
                alert(
                    "Impossibile tonalizzare documento " + documento.name + 
                    ": incremento del canale " + canale + " fuori dall'intervallo [0,200]. Il documento sarà ignorato.", 
                    "Errore di tonalizzazione", 
                    true
                );

                livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;
                app.purge(PurgeTarget.HISTORYCACHES);
                return false;
            }
        
            this._applicaMiscelatoreCanale(livelloRiferimento, this._canaliUscitaMiscelatore, fattoriTonalizzazione);
            percentualeCanale = this._filtroLetturaTonoCMYK.rilevaPercentualeCanale(livelloRiferimento, campionatoreColore, canale);
            livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;

        } while (percentualeCanale != riferimentoCanale);

        app.purge(PurgeTarget.HISTORYCACHES);
        return true;
    };

    this._tonalizza = function(livelloRiferimento, campionatoreColore, riferimentiUtente) {
        var tonoIniziale;
        var fattoriTonalizzazione;
        var tonoRiferimento = new SolidColor().cmyk;
        
        tonoIniziale = this._filtroLetturaTonoCMYK.rilevaTono(livelloRiferimento, campionatoreColore);
        tonoRiferimento.cyan = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.cyan, tonoIniziale.cyan);
        tonoRiferimento.magenta = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.magenta, tonoIniziale.magenta);
        tonoRiferimento.yellow = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.yellow, tonoIniziale.yellow);
        tonoRiferimento.black = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.black, tonoIniziale.black);
        fattoriTonalizzazione = this._calcolaFattoriTonalizzazione(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore);

        if (fattoriTonalizzazione != undefined) {
            this._applicaMiscelatoreCanale(livelloRiferimento.parent.backgroundLayer, this._canaliUscitaMiscelatore, fattoriTonalizzazione);
        }
    }

    // riferimento è assunto come array contenente 1 o 2 elementi, a seconda che sia un valore o un range
    this._determinaRiferimentoEffettivoCanale = function(riferimento, valoreIniziale) {
        if (riferimento.length == 1) {
            return riferimento;
        }

        if (valoreIniziale > riferimento[1]) {
            return riferimento[1];
        }

        if (valoreIniziale < riferimento[0]) {
            return riferimento[0];
        }

        return valoreIniziale;
    };

    this.esegui = function(documenti) {
        var riferimentiUtente;
        var documentiNonValidi;
        var tabellaToni;
        var campionatoreColore;
        var livelloRiferimento;

        this._filtroLetturaTonoCMYK.esegui(documenti);

        if (documenti.length == 0) {
            return;
        }

        tabellaToni = this._filtroLetturaTonoCMYK.leggiTabellaToni;
        documentiNonValidi = this._filtroLetturaTonoCMYK.leggiDocumentiConTonoNonValido();

        if (documentiNonValidi.length != 0) {
            alert(
                "Impossibile procedere con la tonalizzazione: i documenti " +
                documentiNonValidi.toString() + " hanno uno o più canali allo 0%.",
                "Errore di formato documenti.", 
                true
            );

            return;
        }

        riferimentiUtente = this._determinaTonoRiferimento(tabellaToni.leggiTonoMedio());

        if (riferimentiUtente == undefined) {
            return;
        }

        for (var i = 0; i < documenti.length; i++) {
            app.activeDocument = documenti[i];
            documenti[i].colorSamplers.add([new UnitValue(1, 'px'), new UnitValue(1, 'px')]);
            campionatoreColore = documenti[i].colorSamplers[documenti[i].colorSamplers.length - 1];
            livelloRiferimento = documenti[i].backgroundLayer.duplicate();
            documenti[i].activeLayer = livelloRiferimento;
            livelloRiferimento.applyAverage();
            this._tonalizza(livelloRiferimento, campionatoreColore, riferimentiUtente);
            documenti[i].colorSamplers.removeAll();
            livelloRiferimento.remove();
            documenti[i].save();
        }

    };

    this.settaFiltroLetturaTonoCMYK(filtroLetturaTonoCMYK);

}
