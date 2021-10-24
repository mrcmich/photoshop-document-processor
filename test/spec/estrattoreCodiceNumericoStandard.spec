//@include "../../source/estrazione-info-documento/EstrattoreCodiceNumericoStandard.jsx"

var documento;
var estrattoreCodiceNumerico = new EstrattoreCodiceNumericoStandard();

describe("Il metodo estraiInfo(documenti) di EstrattoreCodiceNumericoStandard", function() {
    it("deve lanciare un errore se l'argomento documenti è null", function() {
        expect(function() {
            estrattoreCodiceNumerico.estraiInfo(null);
        }).toThrowError(Error);
    });

    it("deve lanciare un errore se l'argomento documenti è undefined", function() {
        expect(function() {
            estrattoreCodiceNumerico.estraiInfo(undefined);
        }).toThrowError(Error);
    });

    it("deve lanciare un errore se il nome dell'argomento documenti non contiene il carattere '_'.", function() {
        documento = app.documents.add(20, 20, 120, "100nomenonvalido.tiff", NewDocumentMode.CMYK)
        
        expect(function() {
            estrattoreCodiceNumerico.estraiInfo(documento);
        }).toThrowError(Error);
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;
    });

    it("deve ritornare il codice numerico del documento se il nome contiene il carattere '_' almeno 1 volta.", function() {
        documento = app.documents.add(20, 20, 120, "01_nome_valido.tiff", NewDocumentMode.CMYK)

        expect(estrattoreCodiceNumerico.estraiInfo(documento)).toEqual("01");
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;

        documento = app.documents.add(20, 20, 120, "37_nome_valido.tiff", NewDocumentMode.CMYK)

        expect(estrattoreCodiceNumerico.estraiInfo(documento)).toEqual("37");
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;

        documento = app.documents.add(20, 20, 120, "99_nome_valido.tiff", NewDocumentMode.CMYK)

        expect(estrattoreCodiceNumerico.estraiInfo(documento)).toEqual("99");
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;
    });
});