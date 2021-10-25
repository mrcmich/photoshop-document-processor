//@include "../../source/estrazione-info-documento/EstrattoreNomeStandard.jsx"

var documento;
var estrattoreNome = new EstrattoreNomeStandard();

describe("Il metodo estraiInfo(documenti) di EstrattoreNomeStandard", function() {
    it("deve lanciare un errore se l'argomento documenti è null", function() {
        expect(function() {
            estrattoreNome.estraiInfo(null);
        }).toThrowError(Error);
    });

    it("deve lanciare un errore se l'argomento documenti è undefined", function() {
        expect(function() {
            estrattoreNome.estraiInfo(undefined);
        }).toThrowError(Error);
    });

    it("deve lanciare un errore se il nome dell'argomento documenti non contiene il carattere '.'.", function() {
        documento = app.documents.add(20, 20, 120, "12_nome_non_valido", NewDocumentMode.CMYK)

        expect(function() {
            estrattoreNome.estraiInfo(documento);
        }).toThrowError(Error);
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;
    });

    it("deve lanciare un errore se il nome dell'argomento documenti contiene il carattere '.' 2 o più volte.", function() {
        documento = app.documents.add(20, 20, 120, "12_nome_non_valido.jpeg.tiff", NewDocumentMode.CMYK)

        expect(function() {
            estrattoreNome.estraiInfo(documento);
        }).toThrowError(Error);
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;

        documento = app.documents.add(20, 20, 120, "12_no.me.non.valido.jpeg.tiff", NewDocumentMode.CMYK)

        expect(function() {
            estrattoreNome.estraiInfo(documento);
        }).toThrowError(Error);
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;
    });

    it("deve ritornare il nome del documento privato dell'estensione se il nome contiene il carattere '.' 1 volta.", function() {
        documento = app.documents.add(20, 20, 120, "01_nome_valido.tiff", NewDocumentMode.CMYK)

        expect(estrattoreNome.estraiInfo(documento)).toEqual("01_nome_valido");
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;

        documento = app.documents.add(20, 20, 120, "02_nome_valido.jpg", NewDocumentMode.CMYK)

        expect(estrattoreNome.estraiInfo(documento)).toEqual("02_nome_valido");
        documento.close(SaveOptions.DONOTSAVECHANGES);
        documento = null;
    });
});