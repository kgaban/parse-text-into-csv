import React, { useState } from 'react';

const ProfileParser = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const parseProfiles = () => {
    const lines = inputText.split('\n');
    const profiles = [];

    for (let i = 0; i < lines.length; i++) {
      if (
        (lines[i].includes('Message') || lines[i].includes('Connect') || lines[i].includes('Follow')) &&
        !lines[i].includes('Connections')
      ) {
        let fullNameIndex;
        let roleIndex;

        if (lines[i].includes('Connect') && lines[i - 2].includes('mutual connection')) {
          fullNameIndex = i - 9;
          roleIndex = i - 6;
        } else if (lines[i].includes('Follow')) {
          fullNameIndex = i - 9;
          roleIndex = i - 6;
        } else {
          fullNameIndex = i - 8;
          roleIndex = i - 5;
        }

        if (lines[fullNameIndex]) {
          const fullName = lines[fullNameIndex].trim();

          // Check if there are more than two words in the fullName line
          if (fullName.split(' ').length > 2) {
            continue; // Skip the line if it contains more than just first and last name
          }

          const [firstName, lastName] = fullName.split(' ');
          const role = lines[roleIndex] ? lines[roleIndex].trim() : '';

          // Check if the role contains the word "recruiter"
          if (role.toLowerCase().includes('recruiter')) {
            profiles.push({ firstName, lastName, role });
          }
        }
      }
    }

    return profiles;
  };

  const profiles = parseProfiles();

  return (
    <div>
      <h2>Convert Raw Text to CSV</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your raw text here..."
        value={inputText}
        onChange={handleInputChange}
      ></textarea>
      {profiles.length > 0 ? (
        <>
          <h2>CSV Text</h2>
          <pre>
            {['Last Name', 'First Name', 'Role'].join(',')}
            <br />
            {profiles
              .map((profile) => `${profile.lastName},${profile.firstName},${profile.role}`)
              .join('\n')}
          </pre>
        </>
      ) : (
        <p>No matching profiles found.</p>
      )}
    </div>
  );
};

export default ProfileParser;
