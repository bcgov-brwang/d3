import MotionHoc from "./MotionHoc";
import { useLocation, useHistory} from 'react-router-dom'
import React, { useEffect, useState } from 'react';

const DocumentsComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');




  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const handleClick = () => {
    // Perform any necessary actions before navigation

    // Navigate to the other page
    history.push(`/specific/${name}`);
  };

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const url = `https://localhost:44339/api/applications/details?name=${name}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setApplication(data);
        } else {
          console.error('Failed to fetch application details');
        }
      } catch (error) {
        console.error('Error occurred while fetching application details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicationDetails();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!application) {
    return <h1>No application found.</h1>;
  }

  return (
    <div className="scroll-panel">
      <h4>{application.name} details</h4>
      <button onClick={handleClick}>Go to Chart</button>
      <p>Name: {application.name}</p>
      <p>Database: {application.database}</p>
      <p>Frontend Framework: {application.frontendFramework}</p>
      <p>Frontend Language: {application.frontendLanguage}</p>
      <p>Backend Framework: {application.backendFramework}</p>
      <p>Backend Language: {application.backendLanguage}</p>
      <p>Host Type: {application.hostType}</p>
      <p>CICD Type: {application.cicdType}</p>
      <p>External APIs: {application.externalApis}</p>
      <p>Exposed APIs: {application.exposedApis}</p>
      <p>Stakeholders: {application.stakeholders}</p>
      <p>Tech Contacts: {application.techContacts}</p>
      <p>Release Date: {application.releaseDate}</p>
      <p>Host Servers: {application.hostServers}</p>
      <p>Database Servers: {application.databaseServers}</p>
      <p>Current Version: {application.currentVersion}</p>
    </div>
  );
  
};

const Documents = MotionHoc(DocumentsComponent);

export default Documents;
