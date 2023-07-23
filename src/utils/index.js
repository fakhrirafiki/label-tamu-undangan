export function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function extractRawName(decoratedName) {
  const nameParts = decoratedName.split(",");

  if (nameParts.length > 0) {
    const name = nameParts[0].trim();
    return name
      .replace(
        /^(?:Dr|Drs|Dra|S(?:\.|OS)|M(?:\.|Si)|MA|M(?:\.|A)|Bc(?:\.|)|Ir(?:\.|)|Ing(?:\.|)|D3|S(?:\.|Kom)|S(?:\.|Pd)|S(?:\.|Psi)|H(?:\.|j)|K(?:\.|H))(?:\.\s*)?/i,
        ""
      )
      .trim();
  } else {
    // Return the original input if no comma found
    return decoratedName;
  }
}

const isDuplicate = (obj1, obj2) => {
  // Check if the names are similar after extracting raw names
  const rawName1 = extractRawName(obj1.Nama);
  const rawName2 = extractRawName(obj2.Nama);
  const nameSimilarity = rawName1.toLowerCase() === rawName2.toLowerCase();

  // Add other conditions here to check similarity for other properties if needed
  // For example:
  // const jabatanSimilarity = obj1.Jabatan.toLowerCase() === obj2.Jabatan.toLowerCase();
  // const alamatSimilarity = obj1.Alamat.toLowerCase() === obj2.Alamat.toLowerCase();

  return nameSimilarity; // && jabatanSimilarity && alamatSimilarity;
};

export async function fetchSpreadsheetData(
  spreadsheetId = "1faP8lQG8P_mIEQGFbh1_c4T8pph4dE-2zs1fI6tkuoM",
  sheetName = "Final Sheet!A:D"
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
      })
      .map((obj1, index1, myData) => ({
        ...obj1,
        isPotentiallyDuplicateFlag: myData.some(
          (obj2, index2) => index1 !== index2 && isDuplicate(obj1, obj2)
        ),
      }));

    console.log("jsonData", jsonData);

    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
