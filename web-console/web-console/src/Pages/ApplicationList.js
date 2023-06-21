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
        frontendFramework: newApplication.frontendFramework
        
      })
    });
    const data = await response.json();
    console.log(data);

    setApplications([...applications, data]);
    setNewApplication({ name: "", description: "" });


  };

  useEffect(() => {
    async function fetchApplications() {
      // const url = "https://localhost:44362/weatherforecast";
      // url = 'https://api.open511.gov.bc.ca/events?limit=5';
      const url = 'https://localhost:44339/api/applications/';
      const response = await fetch(url);
      const data = await response.json();
      setApplications(data);
    }
    fetchApplications();
  }, []);

  return (
      <div>
              <h1>Application List</h1>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Database</th>
                    <th>Frontend Framework</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.name} onClick={() => handleApplicationClick(application.name)}>
                      <td>{application.name}</td>
                      <td>{application.database}</td>
                      <td>{application.frontendFramework}</td>
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
                    setNewApplication({ ...newApplication, severity: event.target.value })
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

