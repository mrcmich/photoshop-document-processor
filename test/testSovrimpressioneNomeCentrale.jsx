//@include "../source/oggetti-minimi/Pipeline.jsx"
//@include "../source/sovrimpressione-info/FiltroSovrimpressione.jsx"

var margine = 4;                 // Il margine (in centimetri) che lo script deve lasciare dai bordi della piastrella
var azione = "CENTRALE";   // Variabile contenente il nome dell'azione che definisce le caratteristiche del testo sovrimpresso
var set = "SOVRIMPRESSIONE";         // Variabile contenente il nome del set di tale azione

// ------------------------------------------------------------------------

var preferenzeRighelli;
var filtroSovrimpressione;
var pipeline;

// Salvataggio preferenze iniziali e impostazione preferenze di riferimento
preferenzeRighelli = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.CM;

// Configurazione FiltroSovrimpressione
filtroSovrimpressione = new FiltroSovrimpressione(
    { azioneConfigurazione: azione, setAzioneConfigurazione: set }, 
    new EstrattoreNomeStandard(), 
    new PosizionatoreLivello(margine)
);

// Configurazione e esecuzione Pipeline
pipeline = new Pipeline(app.documents);
pipeline.aggiungiFiltro(filtroSovrimpressione);
pipeline.esegui();

// Ripristino preferenze iniziali
app.preferences.rulerUnits = preferenzeRighelli;
