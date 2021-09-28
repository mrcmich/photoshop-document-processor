var PipelineAstratta = {
    aggiungiFiltro: function(filtro) {
        throw new Error(
            "Invocazione del metodo astratto aggiungiFiltro(filtro) di PipelineAstratta."
        );
    },

    rimuoviFiltro: function(indiceFiltro) {
        throw new Error(
            "Invocazione del metodo astratto rimuoviFiltro(indiceFiltro) di PipelineAstratta."
        );
    },

    elencoFiltri: function() {
        throw new Error(
            "Invocazione del metodo astratto elencoFiltri() di PipelineAstratta."
        );  
    },

    svuota: function() {
        throw new Error(
            "Invocazione del metodo astratto svuota() di PipelineAstratta."
        );
    },

    esegui: function() {
        throw new Error(
            "Invocazione del metodo astratto esegui() di PipelineAstratta."
        );
    },

    concatena: function(pipeline) {
         throw new Error(
            "Invocazione del metodo astratto concatena(pipeline) di PipelineAstratta."
        );
    }

};