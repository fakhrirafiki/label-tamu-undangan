export function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function fetchSpreadsheetData(
  spreadsheetId = "1faP8lQG8P_mIEQGFbh1_c4T8pph4dE-2zs1fI6tkuoM",
  sheetName = "Teman Mama 1!A2:A"
) {
  const apiKey = "AIzaSyCIhTDdUsIKzMCEzRKB6qvThhMRiNiyRM8";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching spreadsheet data.");
    }
    const data = await response.json();
    const [header, ...rows] = data.values;
    const jsonData = rows.map((row) => {
      const item = {};
      row.forEach((value, index) => {
        item[header[index]] = value;
      });
      return item;
    });
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
