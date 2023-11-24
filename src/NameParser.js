import React, { useEffect, useState } from 'react';

function TruncateOnDelimiter({ inputString, delim = 'View', partToReturn = 0 }) {
  const parts = inputString.split(delim, 1);
  return parts[partToReturn];
}

function ParseFirstAndLastName({ fullName }) {
  const nameParts = fullName.split(' ');

  if (nameParts.length === 2) {
    return { status: 'PASS', first: nameParts[0], last: nameParts[1] };
  }

  return { status: 'FAIL' };
}

function FindAndOutput({ outputCsvFile, targetSubstring }) {
  const [matchingRows, setMatchingRows] = useState([]);
  const [inputData, setInputData] = useState('');
  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lines = inputData.split('\n');

        const rows = lines
          .filter((line) => line.toLowerCase().includes(targetSubstring.toLowerCase()))
          .map((line) => {
            const fullName = TruncateOnDelimiter({ inputString: line });
            const parsedName = ParseFirstAndLastName({ fullName });

            if (parsedName.status === 'FAIL') {
              return null;
            }

            return { First: parsedName.first, Last: parsedName.last };
          })
          .filter((row) => row !== null);

        setMatchingRows(rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [inputData, targetSubstring]);

  const handleDownload = () => {
    const csvContent = matchingRows
      .map((row) => `${row.Last},${row.First}`)
      .join('\n');
    const blob = new Blob([`Last,First\n${csvContent}`], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = outputCsvFile;
    link.click();
  };

  return (
    <div>
      <h1>CSV Template Converter</h1>
      <textarea
        rows="5"
        cols="30"
        placeholder="Enter data here..."
        value={inputData}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={handleDownload}>Download CSV</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <FindAndOutput
        outputCsvFile="output.csv"
        targetSubstring="s profile"
      />
    </div>
  );
}
