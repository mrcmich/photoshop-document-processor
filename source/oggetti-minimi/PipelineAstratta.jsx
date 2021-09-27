var PipelineAstratta = {
    aggiungiFiltro: function(filtro) {
        throw new SyntaxError("Invocazione del metodo astratto aggiungiFiltro(filtro) di PipelineAstratta.");
    },

    rimuoviFiltro: function(indiceFiltro) {
        throw new SyntaxError("Invocazione del metodo astratto rimuoviFiltro(indiceFiltro) di PipelineAstratta.");
    },

    elencoFiltri: function() {
        throw new SyntaxError("Invocazione del metodo astratto elencoFiltri() di PipelineAstratta.");  
    },

    svuota: function() {
        throw new SyntaxError("Invocazione del metodo astratto svuota() di PipelineAstratta.");
    },

    esegui: function() {
        throw new SyntaxError("Invocazione del metodo astratto esegui() di PipelineAstratta.");
    }

};