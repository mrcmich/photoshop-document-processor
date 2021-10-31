//@include "../source/oggetti-minimi/Pipeline.jsx"
//@include "../source/tonalizzazione/FiltroTonalizzazioneCMYK.jsx"
//@include "../source/gestione-io/ScrittoreFile.jsx"

var pipeline;
var filtroLetturaTono;
var filtroTonalizzazione;

// Configurazione filtri
filtroLetturaTono = new FiltroLetturaTonoCMYK(new TabellaToniCMYK(new EstrattoreCodiceNumericoStandard()), new ScrittoreTabellaToni());
filtroTonalizzazione = new FiltroTonalizzazioneCMYK(filtroLetturaTono, new ScrittoreFile());

// Configurazione e esecuzione Pipeline
pipeline = new Pipeline(app.documents);
pipeline.aggiungiFiltro(filtroTonalizzazione);
pipeline.esegui();
