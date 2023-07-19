export function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function fetchSpreadsheetData(
  spreadsheetId = "1faP8lQG8P_mIEQGFbh1_c4T8pph4dE-2zs1fI6tkuoM",
  sheetName = "Compile Undangan!A:D"
) {
  const apiKey = "AIzaSyCIhTDdUsIKzMCEzRKB6qvThhMRiNiyRM8";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching spreadsheet data.");
    }
    const data = await response.json();

    console.log("data", data);

    const [header, ...rows] = data.values;

    const jsonData = rows
      .filter((arr) => {
        return arr[0];
      })
      .sort(function (a, b) {
        var textA = a[0].toUpperCase();
        var textB = b[0].toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .map((row) => {
        const item = {};
        row.forEach((value, index) => {
          item[header[index]] = value;
        });
        return item;
      });

    console.log("jsonData", jsonData);

    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
