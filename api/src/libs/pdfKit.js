const PDFDocument = require("pdfkit");

function buildPdf(dataCallback, endCallback) {
    const doc = new PDFDocument();

    doc.on('data', dataCallback);
    doc.on('end', endCallback);


    doc.fontSize(25).text('Events List', 100, 100);
    doc.end();

}
module.exports = PDFDocument;