/**
* Funzione che lancia un errore se la condizione fornita come parametro
* non è verificata, documentandolo in maniera opportuna.
* @param {boolean} condizione - la condizione che viene valutata.
* @param {string} metodo - il nome del metodo in cui la condizione è valutata.
* @param {string} oggetto - il nome dell'oggetto in cui la condizione è valutata.
* @param {string} descrizione - la descrizione dell'errore che deve essere generato se la condizione non è verificata.
* @param {Object} dati - oggetto opzionale che può essere passato all'errore, associato alla proprietà dati.
* @throws Lancia un errore se la condizione non è verificata.
* @returns {undefined}
*/
function asserzione(condizione, metodo, oggetto, descrizione, dati) {
    if (!condizione) {
        var errore = new Error(
            "Errore in ".concat(oggetto).
            concat("[").concat(metodo).concat("]: ").
            concat(descrizione)
        );

        if (dati != undefined) {
            errore.dati = dati;
        }

        throw errore;
    }
}