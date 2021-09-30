function asserzione(condizione, metodo, oggetto, descrizione) {
    if (!condizione) {
        throw new Error(
            "Errore in ".concat(oggetto).
            concat("[").concat(metodo).concat("]: ").
            concat(descrizione)
        );
    }
}