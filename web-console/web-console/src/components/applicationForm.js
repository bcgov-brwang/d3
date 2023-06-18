import React, { useState } from 'react';


const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [database, setDatabase] = useState('');
  const [frontendFramework, setFrontendFramework] = useState('');
  const [frontendLanguage, setFrontendLanguage] = useState('');
  const [backendFramework, setBackendFramework] = useState('');
  const [backendLanguage, setBackendLanguage] = useState('');
  const [hostType, setHostType] = useState('');
  const [cicdType, setCicdType] = useState('');

  const [externalApis, setExternalApis] = useState('');
  const [exposedApis, setExposedApis] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [techContacts, setTechContacts] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [hostServers, setHostServers] = useState('');
  const [databaseServers, setDatabaseServers] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      name,
      database,
      frontendFramework,
      frontendLanguage,
      backendFramework,
      backendLanguage,
      hostType,
      cicdType,
      externalApis,
      exposedApis,
      stakeholders,
      techContacts,
      releaseDate,
      hostServers,
      databaseServers,
      currentVersion
    };

    try {
      // Send the form data to the backend API
      const url = "https://localhost:44339/api/applications";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Application submitted successfully
        console.log('Application submitted!');
        window.location.href = "/";
        
      } else {
        // Handle the error if the submission fails
        console.error('Application submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>New Application</h1>
      <div className="scroll-panel">
          

          <form className="form-container" onSubmit={handleSubmit}>
              <label>
                  Application Name:
                  <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                  />
              </label>
              
              <label>
                  Database:
                  <input
                      type="text"
                      value={database}
                      onChange={(event) => setDatabase(event.target.value)}
                  />
              </label>
              
              <label>
                  Frontend Framework:
                  <input
                      type="text"
                      value={frontendFramework}
                      onChange={(event) => setFrontendFramework(event.target.value)}
                  />
              </label>
              <label>
                  Frontend Language:
                  <input
                      type="text"
                      value={frontendLanguage}
                      onChange={(event) => setFrontendLanguage(event.target.value)}
                  />
              </label>
              <label>
                  Backend Framework:
                  <input
                      type="text"
                      value={backendFramework}
                      onChange={(event) => setBackendFramework(event.target.value)}
                  />
              </label>
              <label>
                  Backend Language:
                  <input
                      type="text"
                      value={backendLanguage}
                      onChange={(event) => setBackendLanguage(event.target.value)}
                  />
              </label>
              <label>
                  Host Type:
                  <input
                      type="text"
                      value={hostType}
                      onChange={(event) => setHostType(event.target.value)}
                  />
              </label>
              <label>
                  CICD Type:
                  <input
                      type="text"
                      value={cicdType}
                      onChange={(event) => setCicdType(event.target.value)}
                  />
              </label>
              <label>
                  External APIs:
                  <input
                      type="text"
                      value={externalApis}
                      onChange={(event) => setExternalApis(event.target.value)}
                  />
              </label>
              <label>
                  Exposed APIs:
                  <input
                      type="text"
                      value={exposedApis}
                      onChange={(event) => setExposedApis(event.target.value)}
                  />
              </label>
              <label>
                  Stakeholders:
                  <input
                      type="text"
                      value={stakeholders}
                      onChange={(event) => setStakeholders(event.target.value)}
                  />
              </label>
              <label>
                  Technical Contants:
                  <input
                      type="text"
                      value={techContacts}
                      onChange={(event) => setTechContacts(event.target.value)}
                  />
              </label>
              <label>
                  Release Date:
                  <input
                      type="text"
                      value={releaseDate}
                      onChange={(event) => setReleaseDate(event.target.value)}
                  />
              </label>
              <label>
                  Host Servers:
                  <input
                      type="text"
                      value={hostServers}
                      onChange={(event) => setHostServers(event.target.value)}
                  />
              </label>
              <label>
                  Database Servers:
                  <input
                      type="text"
                      value={databaseServers}
                      onChange={(event) => setDatabaseServers(event.target.value)}
                  />
              </label>
              <label>
                  Current Version:
                  <input
                      type="text"
                      value={currentVersion}
                      onChange={(event) => setCurrentVersion(event.target.value)}
                  />
              </label>
              
              <button type="submit">Submit</button>
          </form>

      </div>
      
    </div>

  );
};

export default ApplicationForm;
