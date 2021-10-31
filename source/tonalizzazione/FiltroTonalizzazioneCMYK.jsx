//@include "../oggetti-minimi/Asserzione.jsx"
//@include "../gestione-io/ScrittoreFile.jsx"
//@include "FiltroTonalizzazioneAstratto.jsx"
//@include "FiltroLetturaTonoCMYK.jsx"

/**
* Constructor function per la creazione di un filtro tonalizzazione CMYK, oggetto che 
* si occupa della tonalizzazione di un set di documenti ad un tono di riferimento specificato dall'utente,
* collaborando con un filtro lettura tono cui demanda la rilevazione e validazione del tono dei documenti e la loro organizzazione
* in una tabella dei toni. Terminata l'elaborazione, produce un report (su file).
* Ha FiltroTonalizzazioneAstratto come prototipo.
* @param {FiltroLetturaTonoAstratto} filtroLetturaTonoCMYK - il filtro lettura tono da associare al filtro tonalizzazione.
* @param {ScrittoreFileAstratto} scrittoreFile - oggetto deputato al salvataggio del report di esecuzione su file.
* @constructor
*/
function FiltroTonalizzazioneCMYK(filtroLetturaTonoCMYK, scrittoreFile) {
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
    * Oggetto deputato al salvataggio del report dell'elaborazione su file.
    * @type {ScrittoreFileAstratto}
    * @protected
    */
    this._scrittoreFile = null;

    /**
    * Array contenente il nome dei documenti con tono che il filtro non è in grado di 
    * portare a riferimento perché sono richiesti uno o più fattori di tonalizzazione fuori dal range [0, 200].
    * @type {Array}
    * @protected
    */
    this._documentiNonTonalizzabili = [];

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
    * canale CMYK) che possono essere costituiti da singoli valori oppure da range del tipo [min, max]. Il tono di default passato come 
    * parametro viene usato per inizializzare i campi di testo in cui l'utente inserirà poi i riferimenti.
    * Ritorna un oggetto con proprietà "cyan", "magenta", "yellow", "black" e valori dati dai riferimenti di cui sopra, o undefined
    * se l'utente ha annullato l'inserimento.
    * @throws Lancia un errore se il parametro passato è null o undefined. 
    * @param {SolidColor} tonoDefault - il tono usato per l'inizializzazione delle finestre di dialogo di raccolta dei riferimenti.
    * @returns {Object}
    */
    this._determinaTonoRiferimento = function(tonoDefault) {
        var riferimentiUtente = {};

        riferimentiUtente.cyan = this._determinaRiferimentoCanale("Ciano", tonoDefault.cmyk.cyan);

        if (riferimentiUtente.cyan == undefined) {
            return;
        }

        riferimentiUtente.magenta = this._determinaRiferimentoCanale("Magenta", tonoDefault.cmyk.magenta);

        if (riferimentiUtente.magenta == undefined) {
            return;
        }

        riferimentiUtente.yellow = this._determinaRiferimentoCanale("Giallo", tonoDefault.cmyk.yellow);

        if (riferimentiUtente.yellow == undefined) {
            return;
        }

        riferimentiUtente.black = this._determinaRiferimentoCanale("Nero", tonoDefault.cmyk.black);

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
            input = prompt(
                "Inserisci riferimento per il canale " + canale + ".\nIl riferimento può essere un singolo valore percentuale oppure un intervallo" +
                " di valori percentuali nella forma min:max (con min <= max)." +
                "\nSe necessario, usa il carattere punto come separatore decimale." , 
                riferimentoDefault, 
                "Riferimento " + canale
            );

            if (input == null) {
                return;
            }

            input = input.split(":");

            if (input.length == 0 || input.length > 2) {
                alert(
                    "Riferimento non valido: numero di riferimenti errato.", 
                    "Riferimento non valido"
                );

                continue;
            }

            if (input.length == 1) {
                if (!this._validaPercentualeCanale(input[0])) {
                    alert(
                    "Riferimento non valido: il riferimento inserito non è una quantità percentuale valida.",
                    "Riferimento non valido"
                    );

                    continue;
                }

                riferimento.push(Math.round(Number(input[0])));
                break;
            } 

            if (!this._validaPercentualeCanale(input[0]) || !this._validaPercentualeCanale(input[1])) {
                alert(
                    "Riferimento non valido: i riferimenti inseriti non sono quantità percentuali valide.", 
                    "Riferimento non valido"
                );

                continue;
            }

            if (Number(input[0]) > Number(input[1])) {
                alert(
                    "Riferimento non valido: il minimo dell'intervallo di riferimento deve essere inferiore al massimo.",
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
        var fattoriTonalizzazione = new SolidColor();

        if (tonoIniziale == undefined) {
            tonoIniziale = this._filtroLetturaTonoCMYK.rilevaTono(livelloRiferimento, campionatoreColore);
        }

        fattoriTonalizzazione.cmyk.cyan = Math.round((tonoRiferimento.cmyk.cyan * 100) / tonoIniziale.cmyk.cyan);
        fattoriTonalizzazione.cmyk.magenta = Math.round((tonoRiferimento.cmyk.magenta * 100) / tonoIniziale.cmyk.magenta);
        fattoriTonalizzazione.cmyk.yellow = Math.round((tonoRiferimento.cmyk.yellow * 100) / tonoIniziale.cmyk.yellow);
        fattoriTonalizzazione.cmyk.black = Math.round((tonoRiferimento.cmyk.black * 100) / tonoIniziale.cmyk.black);

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
        this._canaliUscitaMiscelatore[0][0] = fattoriTonalizzazione.cmyk.cyan;
        this._canaliUscitaMiscelatore[1][1] = fattoriTonalizzazione.cmyk.magenta;
        this._canaliUscitaMiscelatore[2][2] = fattoriTonalizzazione.cmyk.yellow;
        this._canaliUscitaMiscelatore[3][3] = fattoriTonalizzazione.cmyk.black;

        livello.mixChannels(this._canaliUscitaMiscelatore);
    };

    /**
    * Metodo per il calcolo del fattore di tonalizzazione di uno specifico canale, ovvero dell'incremento da applicare al 
    * miscelatore canale per portare la quantità percentuale del canale a riferimento, valutato sulla base del livello 
    * di riferimento passato come parametro. Il fattore calcolato è inserito all'interno del parametro fattoriTonalizzazione.
    * Ritorna true se il fattore calcolato è valido, cioè dentro al range [0, 200], false altrimenti.
    * @param {ArtLayer} livelloRiferimento - il livello rispetto al quale calcolare il fattore di tonalizzazione.
    * @param {string} canale - il nome del canale per cui si vuole calcolare il fattore, uno dei quattro canali CMYK (cyan, magenta, yellow, black).
    * @param {number} riferimentoCanale - la quantità percentuale di riferimento per il canale, a cui questo deve essere riportato.
    * @param {SolidColor} fattoriTonalizzazione - oggetto in cui viene inserito il fattore di tonalizzazione calcolato per il canale.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla rilevazione della quantità percentuale del canale.
    * @returns {boolean}
    */
    this._calcolaFattoreCanale = function(livelloRiferimento, canale, riferimentoCanale, fattoriTonalizzazione, campionatoreColore) {
        var incremento;
        var percentualeCanale;
        var statoInizialeDocumento;
        var erroreTonalizzazioneCanale = 0.5;
    
        statoInizialeDocumento = livelloRiferimento.parent.activeHistoryState;
        this._applicaMiscelatoreCanale(livelloRiferimento, fattoriTonalizzazione);
        percentualeCanale = this._filtroLetturaTonoCMYK.rilevaPercentualeCanale(livelloRiferimento, campionatoreColore, canale);
        livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;
        
        if (Math.abs(riferimentoCanale - percentualeCanale) <= erroreTonalizzazioneCanale) {
            return true;
        }
        
        incremento = (percentualeCanale > riferimentoCanale) ? -1 : 1;
        
        while (true) {
            fattoriTonalizzazione.cmyk[canale] += incremento;
            
            if (fattoriTonalizzazione.cmyk[canale] < 0 || fattoriTonalizzazione.cmyk[canale] > 200) {
                this._documentiNonTonalizzabili.push(livelloRiferimento.parent.name);
                livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;
                app.purge(PurgeTarget.HISTORYCACHES);
                return false;
            }
        
            this._applicaMiscelatoreCanale(livelloRiferimento, fattoriTonalizzazione);
            percentualeCanale = this._filtroLetturaTonoCMYK.rilevaPercentualeCanale(livelloRiferimento, campionatoreColore, canale);
            livelloRiferimento.parent.activeHistoryState = statoInizialeDocumento;
            
            if (Math.abs(riferimentoCanale - percentualeCanale) <= erroreTonalizzazioneCanale) {
                break;
            }

        }
        
        app.purge(PurgeTarget.HISTORYCACHES);
        return true;
    };

    /**
    * Metodo per la tonalizzazione del livello passato come parametro, sulla base dell'oggetto riferimentiUtente (contenente 
    * i valori di riferimento inseriti dall'utente per il tono). Si noti che riferimentiUtente è un oggetto con proprietà "cyan", "magenta", 
    * "yellow","black" e valori costituiti dagli array contenenti il valore (o i valori, nel caso di un range del tipo [min, max]) di riferimento
    * per il canale corrispondente.
    * @param {ArtLayer} livelloRiferimento - il livello rispetto al quale calcolare il fattore di tonalizzazione.
    * @param {ColorSampler} campionatoreColore - oggetto deputato alla rilevazione della quantità percentuale del canale.
    * @param {Object} riferimentiUtente - oggetto che, per ogni canale, riporta il corrispondente riferimento inserito dall'utente (leggere sopra).
    * @returns {undefined}
    */
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

    /**
    * Metodo per la determinazione della quantità percentuale di riferimento effettiva di un canale, a partire da un riferimento e 
    * dalla quantità percentuale iniziale del canale. Se riferimento contiene un singolo valore, tale quantità coincide con il valore. 
    * Se riferimento contiene due valori (che identificano gli estremi di un intervallo) tale quantità viene posta uguale al minimo dell'intervallo
    * se la quantità iniziale è inferiore al minimo oppure al massimo se la quantità iniziale è superiore al massimo.
    * Ritorna la quantità percentuale di riferimento effettiva.
    * @param {Array} riferimento - array contenente il riferimento per il canale, sotto forma di singolo valore o di coppia di valori (nel secondo caso, i due valori rappresentano gli estremi del range del tipo [min, max]).
    * @param {number} valoreIniziale - quantità percentuale iniziale del canale, usata per valutare la quantità percentuale di riferimento effettiva.
    * @returns {number}
    */
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

    /**
    * Metodo per la generazione di un report dell'elaborazione, in cui sono specificati il tono di riferimento applicato ai
    * documenti e l'elenco dei documenti non tonalizzati (inclusa la ragione per cui la tonalizzazione non è stata possibile).
    * @protected
    * @param {Array} documentiConTonoNonValido - array contenente il nome dei documenti con uno o più canali allo 0%.
    * @param {Array} documentiNonTonalizzabili - array contenente il nome dei documenti che richiedono fattori di tonalizzazione fuori dal range [0,200].
    * @param {Object} riferimentiUtente - oggetto che contiene i riferimenti inseriti dall'utente per la tonalizzazione (vedi metodo _determinaTonoRiferimento).
    * @returns {Array}
    */
    this._generaReport = function(documentiConTonoNonValido, documentiNonTonalizzabili, riferimentiUtente) {
        var report = ["report"];
        var canali = ["cyan", "magenta", "yellow", "black"];
        var tonoRiferimento = "Applicato tono di riferimento [";
        var documentiNonValidi;

        for (var i = 0; i < canali.length; i++) {
            var ref = riferimentiUtente[canali[i]];

            if (ref.length == 1) {
                tonoRiferimento = tonoRiferimento.concat(ref[0]);
            } else if (ref.length == 2) {
                tonoRiferimento = tonoRiferimento.concat(ref[0]).concat(":").concat(ref[1]);
            }

            if (i < canali.length - 1) {
                tonoRiferimento = tonoRiferimento.concat(",");
            }
        }

        tonoRiferimento = tonoRiferimento.concat("].");
        report.push(tonoRiferimento);

        if (documentiConTonoNonValido.length == 0 && documentiNonTonalizzabili == 0) {
            report.push("Tonalizzati tutti i documenti.");
        } else {
            if (documentiConTonoNonValido.length > 0) {
                documentiNonValidi = "Documenti ";

                for (var i = 0; i < documentiConTonoNonValido.length; i++) {
                    documentiNonValidi = documentiNonValidi.concat(documentiConTonoNonValido[i]);

                    if (i < documentiConTonoNonValido.length - 1) {
                        documentiNonValidi = documentiNonValidi.concat(", ");
                    }
                }

                documentiNonValidi = documentiNonValidi.concat(" non tonalizzati: uno o più canali allo 0%.");
                report.push(documentiNonValidi);
            }

            if (documentiNonTonalizzabili.length > 0) {  
                documentiNonValidi = "Documenti ";

                for (var i = 0; i < documentiNonTonalizzabili.length; i++) {
                    documentiNonValidi = documentiNonValidi.concat(documentiNonTonalizzabili[i]);

                    if (i < documentiNonTonalizzabili.length - 1) {
                        documentiNonValidi = documentiNonValidi.concat(", ");
                    }
                }

                documentiNonValidi = documentiNonValidi.concat(" non tonalizzati: uno o più fattori di tonalizzazione superiori al +200%.");
                report.push(documentiNonValidi);
            }
        }

        return report;
    };

    /**
    * Metodo per l'esecuzione del filtro tonalizzazione.
    * Il filtro si applica all'array di documenti passato come parametro.
    * Visualizza un messaggio di errore all'utente e termina se sono presenti documenti non validi.
    * Termina senza errori se l'utente ha annullato l'inserimento del tono di riferimento.
    * @param {Array} documenti - i documenti che il filtro deve processare.
    * @returns {undefined}
    */
    this.esegui = function(documenti) {
        var riferimentiUtente;
        var documentiConTonoNonValido = []; 
        var tabellaToni;
        var campionatoreColore;
        var livelloRiferimento;
        var documentiDaIgnorare = {};
        var report;
        
        this._filtroLetturaTonoCMYK.esegui(documenti);

        if (documenti.length == 0) {
            return;
        }

        this._documentiNonTonalizzabili.length = 0;
        tabellaToni = this._filtroLetturaTonoCMYK.leggiTabellaToni();
        documentiConTonoNonValido = this._filtroLetturaTonoCMYK.leggiDocumentiConTonoNonValido();
        riferimentiUtente = this._determinaTonoRiferimento(tabellaToni.leggiTonoMedio());

        if (riferimentiUtente == undefined) {
            return;
        }
    
        for (var i = 0; i < documentiConTonoNonValido.length; i++) {
            var doc = documentiConTonoNonValido[i];
            
            documentiDaIgnorare[doc] = 0;
        }

        for (var i = 0; i < documenti.length; i++) {
            if (documenti[i].name in documentiDaIgnorare) {
                continue;
            }
            
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

        if (documentiConTonoNonValido.length > 0 || this._documentiNonTonalizzabili.length > 0) {
            alert(
                "Presenti documenti non tonalizzati:\nVedi report per i dettagli.", 
                "Documenti non tonalizzati"
            );
        }

        report = this._generaReport(documentiConTonoNonValido, this._documentiNonTonalizzabili, riferimentiUtente);
        this._scrittoreFile.scriviSuFile(report);
    };

    /**
    * Metodo setter per l'attributo _scrittoreFile.
    * @throws Lancia un errore se il parametro passato è null o undefined.
    * @param {ScrittoreFileAstratto} scrittoreFile - oggetto deputato al salvataggio del report di esecuzione su file.  
    * @returns {undefined}
    */
    this.settaScrittoreFile = function(scrittoreFile) {
        asserzione(
            scrittoreFile != undefined, 
            "settaScrittoreFile(scrittoreFile)", 
            "FiltroTonalizzazioneCMYK", 
            "scrittoreFile null o undefined."
        );

        this._scrittoreFile = scrittoreFile;
    };

    this.settaFiltroLetturaTonoCMYK(filtroLetturaTonoCMYK);
    this.settaScrittoreFile(scrittoreFile);

}
