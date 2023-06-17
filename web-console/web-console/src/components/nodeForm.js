import React, { useState } from 'react';
import ApplicationForm from './applicationForm';
import DatabaseForm from './databaseForm';
import FrontendFrameworkForm from './frontendFrameworkForm';

const NodeForm = () => {
  const [nodeType, setNodeType] = useState('');
  
  const handleNodeTypeChange = (event) => {
    setNodeType(event.target.value);
  };
  
  return (
    <div>
      <h1>New Node</h1>
      <label htmlFor="nodeType">Node Type:</label>
      <select id="nodeType" value={nodeType} onChange={handleNodeTypeChange}>
        <option value="">Select Node Type</option>
        <option value="Application">Application</option>
        <option value="Database">Database</option>
        <option value="Frontend Framework">Frontend Framework</option>
      </select>
      
      {nodeType === 'Application' && (
        <div>
          <h2>Application Form</h2>
          {/* Render your application form fields here */}
          <ApplicationForm/>
        </div>
      )}
      
      {nodeType === 'Database' && (
        <div>
          <h2>Database Form</h2>
          {/* Render your database form fields here */}
          <DatabaseForm/>
        </div>
      )}
      
      {nodeType === 'Frontend Framework' && (
        <div>
          <h2>Frontend Framework Form</h2>
          {/* Render your frontend framework form fields here */}
          <FrontendFrameworkForm/>
        </div>
      )}
      
      {/* Render the rest of your form fields */}
      
      <button type="submit">Submit</button>
    </div>
  );
};

export default NodeForm;
