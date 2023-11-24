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

function FindAndOutput({ targetSubstring }) {
  const [matchingRows, setMatchingRows] = useState([]);
  const [inputData, setInputData] = useState('');

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const lines = inputData.split('\n');

        const rows = lines
          .filter((line) => line.toLowerCase().includes(targetSubstring.toLowerCase()))
          .map((line, index) => {
            const fullName = TruncateOnDelimiter({ inputString: line });
            const parsedName = ParseFirstAndLastName({ fullName });

            if (parsedName.status === 'FAIL') {
              return null;
            }

            return { id: index, First: parsedName.first, Last: parsedName.last };
          })
          .filter((row) => row !== null);

        setMatchingRows(rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [inputData, targetSubstring]);


  return (
    <div>
      <h1>Raw Text</h1>
      <textarea
        rows="5"
        cols="30"
        placeholder="Enter data here..."
        value={inputData}
        onChange={handleInputChange}
      ></textarea>
      <br />
      {matchingRows.length > 0 ? (
        <>
          <h2>CSV Text</h2>
          <pre>{matchingRows.map((row) => `${row.Last},${row.First}`).join('\n')}</pre>
        </>
      ) : (
        <p>No matching rows found.</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <FindAndOutput targetSubstring="s profile" />
    </div>
  );
}
