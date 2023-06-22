import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({ name: "", status: "", severity: "" });
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  function handleApplicationClick(applicationName) {
    history.push(`/documents?name=${applicationName}`);
  }

  const newProject = () => {
    history.push(`/projects`);
  };
    const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    setShowForm(false);
    const response = await fetch('https://localhost:44339/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newApplication.name,
        database: newApplication.database,
        frontendFramework: newApplication.frontendFramework,
        frontendLanguage: newApplication.frontendLanguage,
        backendFramework: newApplication.backendFramework,
        backendLanguage: newApplication.backendLanguage,
        hostType: newApplication.hostType,
        cicdType: newApplication.cicdType
        
      })
    });
    const data = await response.json();
    console.log(data);

    setApplications([...applications, data]);
    setNewApplication({ name: "", description: "" });


  };

  useEffect(() => {
    async function fetchApplications() {
      const url = 'https://localhost:44339/api/applications/';
      const response = await fetch(url);
      const data = await response.json();
      setApplications(data);
    }
    fetchApplications();
  }, []);

  return (
      <div className='listTableContainer'>
              <h1>Application List</h1>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Database</th>
                    <th>Frontend Framework</th>
                    <th>Frontend Language</th>
                    <th>Backend Framework</th>
                    <th>Backend Language</th>
                    <th>Host Type</th>
                    <th>CICD Type</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.name} onClick={() => handleApplicationClick(application.name)}>
                      <td>{application.name}</td>
                      <td>{application.database}</td>
                      <td>{application.frontendFramework}</td>
                      <td>{application.frontendLanguage}</td>
                      <td>{application.backendFramework}</td>
                      <td>{application.backendLanguage}</td>
                      <td>{application.hostType}</td>
                      <td>{application.cicdType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>

             {/* <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}> */}
             <button className="btn btn-primary" onClick={() => newProject()}>
             {showForm ? "Cancel" : "Add Application"}
           </button>
           {showForm && (
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  name="newApplicationName"
                  type="text"
                  value={newApplication.name}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, name: event.target.value })
                  }
                />
              </label>
              <label>
                Database:
                <input
                  name="newApplicationDatabase"
                  type="text"
                  value={newApplication.database}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, database: event.target.value })
                  }
                />
              </label>
              <label>
                Frontend Framework:
                <input
                  name="newApplicationFrontendFramework"
                  type="text"
                  value={newApplication.frontendFramework}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, frontendFramework: event.target.value })
                  }
                />
              </label>
              <label>
                Frontend Language:
                <input
                  name="newApplicationFrontendLanguage"
                  type="text"
                  value={newApplication.frontendLanguage}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, frontendLanguage: event.target.value })
                  }
                />
              </label>
              <label>
                Backend Framework:
                <input
                  name="newApplicationBackendFramework"
                  type="text"
                  value={newApplication.backendFramework}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, backendFramework: event.target.value })
                  }
                />
              </label>
              <label>
                Backend Language:
                <input
                  name="newApplicationBackendLanguage"
                  type="text"
                  value={newApplication.backendLanguage}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, backendLanguage: event.target.value })
                  }
                />
              </label>
              <label>
                Host Type:
                <input
                  name="newApplicationHostType"
                  type="text"
                  value={newApplication.hostType}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, hostType: event.target.value })
                  }
                />
              </label>
              <label>
                CICD Type:
                <input
                  name="newApplicationCicdType"
                  type="text"
                  value={newApplication.cicdType}
                  onChange={(event) =>
                    setNewApplication({ ...newApplication, cicdType: event.target.value })
                  }
                />
              </label>

              <button className="btn btn-primary" type="submit">Add</button>
            </form>
          )}
          </div>
      </div>
          
  );
}

export default ApplicationList;

