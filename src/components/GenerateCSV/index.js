import { ExportToCsv } from "export-to-csv";

function DownloadCSV({ csvData, exportFileName }) {
  if (csvData.length) {
    if (csvData == null) return;
    const csvOptions = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      filename: exportFileName,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(csvOptions);
    csvExporter.generateCsv(csvData);
  } else {
    alert("No any data");
  }
}

export default DownloadCSV;
