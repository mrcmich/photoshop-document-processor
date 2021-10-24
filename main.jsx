//@include "source/oggetti-minimi/Pipeline.jsx"
//@include "source/sovrimpressione-info/FiltroSovrimpressione.jsx"
//@include "source/tonalizzazione/FiltroTonalizzazioneCMYK.jsx"

// Salvataggio preferenze Photoshop
var preferenzeRighelli = app.preferences.rulerUnits;

// Definizione e configurazione FiltroSovrimpressione
var configurazioneSovrimpressione = {
    azioneConfigurazione: "FILES NUMERATI",
    setAzioneConfigurazione: "NUMERAZIONE"
};

var margine = 2;
var estrattoreInfo = new EstrattoreCodiceNumericoStandard();
var posizionatoreLivello = new PosizionatoreLivello(margine);
var filtroSovrimpressione = new FiltroSovrimpressione(configurazioneSovrimpressione, estrattoreInfo, posizionatoreLivello);

// Definizione FiltroLetturaTonoCMYK
var tabellaToni = new TabellaToniCMYK(estrattoreInfo);
var scrittoreFile = new ScrittoreTabellaToni();
var filtroLetturaTono = new FiltroLetturaTonoCMYK(tabellaToni, scrittoreFile);

// Definizione FiltroTonalizzazioneCMYK e composizione con FiltroLetturaTonoCMYK
var filtroTonalizzazione = new FiltroTonalizzazioneCMYK(filtroLetturaTono);

// Definizione Pipeline e aggiunta filtri
var pipeline = new Pipeline(app.documents);
pipeline.aggiungiFiltro(filtroSovrimpressione);
pipeline.aggiungiFiltro(filtroTonalizzazione);

// Settaggio preferenze Photoshop alle preferenze di riferimento per PDP, esecuzione pipeline
app.preferences.rulerUnits = Units.CM;
pipeline.esegui();

// Ripristino preferenze Photoshop
app.preferences.rulerUnits = preferenzeRighelli;
