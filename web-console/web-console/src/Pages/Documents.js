import MotionHoc from "./MotionHoc";
import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

const DocumentsComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');




  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const url = "https://localhost:44339/api/applications/details";
        const response = await fetch('your-backend-api-url');
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
    <div>
      <h1>{application.name}</h1>
      <p>{application.description}</p>
      {/* Render other application details here */}
    </div>
  );
  
};

const Documents = MotionHoc(DocumentsComponent);

export default Documents;
