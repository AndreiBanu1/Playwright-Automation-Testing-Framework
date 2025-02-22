import * as fs from 'fs';
import path from 'path';

// Explicitly type the 'data' parameter and the return type of the function
const CSVToJSON = (data: string, delimiter: string = ','): object[] => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title.trim()] = values[index].trim()), obj),
        {} as Record<string, string> // Explicitly type the accumulator object
      );
    });
};

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const testdataDir = path.resolve(srcDir, "testdata");

const csvFilePath = `${testdataDir}`;
export const convertCsvFileToJsonFile = (csvFileName: string, jsonFileName: string, delimiter: string = ','): void => {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(`${testdataDir}//${csvFileName}`, 'utf8');

    // Convert CSV to JSON
    const jsonData = CSVToJSON(csvData, delimiter);

    // Write JSON data to a new file
    fs.writeFileSync(`${testdataDir}//${jsonFileName}`, JSON.stringify(jsonData, null, 2));

    console.log(`Conversion completed. JSON data written to: ${testdataDir}//${jsonFileName}`);
  } catch (error: any) {
    console.error('Error converting CSV to JSON:', error.message);
  }
};
