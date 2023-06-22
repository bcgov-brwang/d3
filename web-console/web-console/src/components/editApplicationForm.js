import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const EditApplicationForm = () => {
  const [application, setApplication] = useState({});
  const [updatedApplication, setUpdatedApplication] = useState({});
  const {name} = useParams();

  // Fetch application data from the backend API
  useEffect(() => {
    fetchApplicationData();
  }, []);

  const fetchApplicationData = async () => {
    try {
      const urlGet = `https://localhost:44339/api/applications/details?name=${name}`;
      const response = await fetch(urlGet); // Replace with your actual API endpoint
      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedApplication((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const urlUpdate = `https://localhost:44339/api/applications/${name}`;
      const response = await fetch(urlUpdate, {
        method: 'PUT', // Assuming you use the PUT method to update the application
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedApplication),
      });

      if (response.ok) {
        console.log('Application updated successfully');
        // Optionally, you can fetch the updated application data again
        // to reflect the changes in the UI
        fetchApplicationData();
        window.location.href = "/";
      } else {
        console.error('Failed to update application');
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <div>
      <h1>Edit Application</h1>
      <div className='scroll-panel'>
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={updatedApplication.name || application.name || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Database:
        <input
          type="text"
          name="database"
          value={updatedApplication.database || application.database || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Frontend Framework:
        <input
          type="text"
          name="frontendFramework"
          value={updatedApplication.frontendFramework || application.frontendFramework || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Frontend Language:
        <input
          type="text"
          name="frontendLanguage"
          value={updatedApplication.frontendLanguage || application.frontendLanguage || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Backend Framework:
        <input
          type="text"
          name="backendFramework"
          value={updatedApplication.backendFramework || application.backendFramework || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Backend Language:
        <input
          type="text"
          name="backendLanguage"
          value={updatedApplication.backendLanguage || application.backendLanguage || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Host Type:
        <input
          type="text"
          name="hostType"
          value={updatedApplication.hostType || application.hostType || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        CICD Type:
        <input
          type="text"
          name="cicdType"
          value={updatedApplication.cicdType || application.cicdType || ''}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Update</button>
    </form>
    </div>
    </div>
    
  );
};

export default EditApplicationForm;
