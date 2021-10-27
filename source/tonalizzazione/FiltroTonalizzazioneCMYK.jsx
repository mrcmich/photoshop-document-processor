//@include "../oggetti-minimi/Asserzione.jsx"
//@include "FiltroTonalizzazioneAstratto.jsx"
//@include "FiltroLetturaTonoCMYK.jsx"

/**
* Constructor function per la creazione di un filtro tonalizzazione CMYK, oggetto che 
* si occupa della tonalizzazione di un set di documenti ad un tono di riferimento specificato dall'utente,
* collaborando con un filtro lettura tono cui demanda la rilevazione e validazione del tono dei documenti e la loro organizzazione
* in una tabella dei toni.
* Ha FiltroTonalizzazioneAstratto come prototipo.
* @param {FiltroLetturaTonoAstratto} filtroLetturaTonoCMYK - il filtro lettura tono da associare al filtro tonalizzazione.
* @constructor
*/
function FiltroTonalizzazioneCMYK(filtroLetturaTonoCMYK) {
    this.__proto__ = FiltroTonalizzazioneAstratto;

    /**
    * Array utilizzato per l'applicazione dei fattori di tonalizzazione al miscelatore canale.
    * @type {Array}
    * @protected
    */
    this._canaliUscitaMiscelatore = [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
    ];

    /**
    * Il filtro lettura tono CMYK con cui il filtro tonalizzazione si integra.
    * @type {FiltroLetturaTonoAstratto}
    * @protected
    */
    this._filtroLetturaTonoCMYK = null;

    /**
    * Metodo setter per l'attributo _filtroLetturaTonoCMYK.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @param {FiltroLetturaTonoAstratto} filtroLetturaTonoCMYK - il filtro lettura tono da associare al filtro tonalizzazione.
    * @returns {undefined}
    */
    this.settaFiltroLetturaTonoCMYK = function(filtroLetturaTonoCMYK) {
        asserzione(
            filtroLetturaTonoCMYK != undefined, 
            "settaFiltroLetturaTonoCMYK(filtroLetturaTonoCMYK)", 
            "FiltroTonalizzazioneCMYK", 
            "filtroLetturaTonoCMYK null o undefined."
        );

        this._filtroLetturaTonoCMYK = filtroLetturaTonoCMYK;
    };

    /**
    * Metodo per la richiesta del tono di riferimento all'utente, sotto forma di una lista di riferimenti (uno per ciascun
    * canale) che possono essere costituiti da singoli valori oppure da range del tipo [min, max]. Il tono di default passato come 
    * parametro viene usato per inizializzare i campi di testo in cui l'utente inserirà poi i riferimenti.
    * Ritorna un oggetto con proprietà "cyan", "magenta", "yellow", "black" e valori dati dai riferimenti di cui sopra, o undefined
    * se l'utente ha annullato l'inserimento.
    * @throws Lancia un errore se il parametro passato è null o undefined. 
    * @param {SolidColor} tonoDefault - il tono usato per l'inizializzazione delle finestre di dialogo di raccolta dei riferimenti.
    * @returns {Object}
    */
    this._determinaTonoRiferimento = function(tonoDefault) {
        var riferimentiUtente = {};

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

    /**
    * Metodo per la richiesta del riferimento per uno specifico canale all'utente, sotto forma di un un array contenente
    * un singolo valore percentuale (se l'utente inserisce un valore) oppure due valori percentuali (nel caso in cui l'utente 
    * inserisca un range del tipo [min, max], i due valori ne identificano gli estremi). Il riferimento di default passato come 
    * parametro viene usato per inizializzare il campo di testo in cui l'utente inserirà il riferimento per il canale.
    * Ritorna l'array di cui sopra, o undefined se l'utente ha annullato l'inserimento. 
    * Se l'input dell'utente non è valido, all'utente viene mostrato un avvertimento e richiesto di inserire nuovamente il riferimento.
    * @throws Lancia un errore se il parametro passato è null o undefined. 
    * @param {string} canale - il nome del canale di cui si richiede il riferimento, come mostrato all'utente.
    * @param {number} riferimentoDefault - il riferimento di default per il canale, usato per inizializzare il relativo campo di testo.
    * @returns {Array}
    */
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

            if (Number(input[0]) > Number(input[1])) {
                alert(
                    "Riferimento non valido: il minimo di un range non può essere maggiore del massimo.", 
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

    /**
    * Metodo per la validazione della quantità percentuale passata come parametro, sotto forma
    * di stringa. Ritorna true se il parametro rappresenta una quantità percentuale valida, false altrimenti.
    * @param {string} stringaPercentuale - la quantità percentuale da valutare, come stringa.
    * @returns {boolean}
    */
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

    /**
    * Metodo per il calcolo dei fattori di tonalizzazione, ovvero degli incrementi da applicare al miscelatore canale per portare il tono
    * di un documento a riferimento, valutati sulla base del livello di riferimento passato come parametro.
    * Ritorna i fattori calcolati come SolidColor, o undefined se uno o più fattori calcolati sono fuori dall'intervallo [0, 200].
    * @param {ArtLayer} livelloRiferimento - il livello rispetto al quale calcolare i fattori di tonalizzazione.
    * @param {SolidColor} tonoIniziale - il tono iniziale del documento cui il livello di riferimento fa riferimento (opzionale).
    * @param {SolidColor} tonoRiferimento - il tono a cui il livello di riferimento deve essere riportato.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla rilevazione delle quantità percentuali di ciascun canale.
    * @returns {SolidColor}
    */
    this._calcolaFattoriTonalizzazione = function(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore) {
        var fattoriTonalizzazione = new SolidColor().cmyk;

        if (tonoIniziale == undefined) {
            tonoIniziale = this._filtroLetturaTonoCMYK.rilevaTono(livelloRiferimento, campionatoreColore);
        }

        fattoriTonalizzazione.cyan = Math.round((tonoRiferimento.cmyk.cyan * 100) / tonoIniziale.cmyk.cyan);
        fattoriTonalizzazione.magenta = Math.round((tonoRiferimento.cmyk.magenta * 100) / tonoIniziale.cmyk.magenta);
        fattoriTonalizzazione.yellow = Math.round((tonoRiferimento.cmyk.yellow * 100) / tonoIniziale.cmyk.yellow);
        fattoriTonalizzazione.black = Math.round((tonoRiferimento.cmyk.black * 100) / tonoIniziale.cmyk.black);

        if (
            this._calcolaFattoreCanale(livelloRiferimento, "cyan", tonoRiferimento.cmyk.cyan, fattoriTonalizzazione, campionatoreColore) &&
            this._calcolaFattoreCanale(livelloRiferimento, "magenta", tonoRiferimento.cmyk.magenta, fattoriTonalizzazione, campionatoreColore) &&
            this._calcolaFattoreCanale(livelloRiferimento, "yellow", tonoRiferimento.cmyk.yellow, fattoriTonalizzazione, campionatoreColore) &&
            this._calcolaFattoreCanale(livelloRiferimento, "black", tonoRiferimento.cmyk.black, fattoriTonalizzazione, campionatoreColore)
        ) {
            return fattoriTonalizzazione;
        }
  
        return;
    };

    /**
    * Metodo che applica un miscelatore canale con i fattori dati da fattoriTonalizzazione al livello fornito come parametro.
    * @param {ArtLayer} livello - il livello cui applicare il miscelatore.
    * @param {SolidColor} fattoriTonalizzazione - i fattori con cui il miscelatore deve essere applicato.
    * @returns {undefined}
    */
    this._applicaMiscelatoreCanale = function(livello, fattoriTonalizzazione) {
        this._canaliUscitaMiscelatore[0][0] = fattoriTonalizzazione.cyan;
        this._canaliUscitaMiscelatore[1][1] = fattoriTonalizzazione.magenta;
        this._canaliUscitaMiscelatore[2][2] = fattoriTonalizzazione.yellow;
        this._canaliUscitaMiscelatore[3][3] = fattoriTonalizzazione.black;

        livello.mixChannels(this._canaliUscitaMiscelatore);
    };

    this._calcolaFattoreCanale = function(livelloRiferimento, canale, riferimentoCanale, fattoriTonalizzazione, campionatoreColore) {
        var incremento;
        var percentualeCanale;
        var statoInizialeDocumento;
    
        statoInizialeDocumento = livelloRiferimento.parent.activeHistoryState;
        this._applicaMiscelatoreCanale(livelloRiferimento, fattoriTonalizzazione);
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
        
            this._applicaMiscelatoreCanale(livelloRiferimento, fattoriTonalizzazione);
            percentualeCanale = this._filtroLetturaTonoCMYK.rilevaPercentualeCanale(livelloRiferimento, campionatoreColore, canale);
            livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;

        } while (percentualeCanale != riferimentoCanale);

        app.purge(PurgeTarget.HISTORYCACHES);
        return true;
    };

    this._tonalizza = function(livelloRiferimento, campionatoreColore, riferimentiUtente) {
        var tonoIniziale;
        var fattoriTonalizzazione;
        var tonoRiferimento = new SolidColor();
        
        tonoIniziale = this._filtroLetturaTonoCMYK.rilevaTono(livelloRiferimento, campionatoreColore);
        tonoRiferimento.cmyk.cyan = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.cyan, tonoIniziale.cmyk.cyan);
        tonoRiferimento.cmyk.magenta = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.magenta, tonoIniziale.cmyk.magenta);
        tonoRiferimento.cmyk.yellow = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.yellow, tonoIniziale.cmyk.yellow);
        tonoRiferimento.cmyk.black = this._determinaRiferimentoEffettivoCanale(riferimentiUtente.black, tonoIniziale.cmyk.black);
        fattoriTonalizzazione = this._calcolaFattoriTonalizzazione(livelloRiferimento, tonoIniziale, tonoRiferimento, campionatoreColore);

        if (fattoriTonalizzazione != undefined) {
            this._applicaMiscelatoreCanale(livelloRiferimento.parent.backgroundLayer, fattoriTonalizzazione);
        }
    }

    // riferimento è assunto come array contenente 1 o 2 elementi, a seconda che sia un valore o un range
    this._determinaRiferimentoEffettivoCanale = function(riferimento, valoreIniziale) {
        if (riferimento.length == 1) {
            return riferimento[0];
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

        tabellaToni = this._filtroLetturaTonoCMYK.leggiTabellaToni();
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
