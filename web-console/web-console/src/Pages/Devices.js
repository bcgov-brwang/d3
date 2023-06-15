import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: "", status: "", severity: "" });
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  function handleDeviceClick(deviceId) {
    history.push(`/device/${deviceId}`);
  }
    const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    setShowForm(false);
    const response = await fetch('https://localhost:44362/api/device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newDevice.name,
        status: newDevice.status,
        severity: newDevice.severity
      })
    });
    const data = await response.json();
    console.log(data);

    setDevices([...devices, data]);
    setNewDevice({ name: "", status: "", severity: "" });


  };

  useEffect(() => {
    async function fetchDevices() {
      // const url = "https://localhost:44362/weatherforecast";
      // url = 'https://api.open511.gov.bc.ca/events?limit=5';
      const url = 'https://localhost:44362/api/device';
      const response = await fetch(url);
      const data = await response.json();
      setDevices(data);
    }
    fetchDevices();
  }, []);

  return (
      <div>
              <h1>Device List</h1>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} onClick={() => handleDeviceClick(device.id)}>
                      <td>{device.name}</td>
                      <td>{device.status}</td>
                      <td>{device.severity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>

             <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
             {showForm ? "Cancel" : "Add Device"}
           </button>
           {showForm && (
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  name="newDeviceName"
                  type="text"
                  value={newDevice.name}
                  onChange={(event) =>
                    setNewDevice({ ...newDevice, name: event.target.value })
                  }
                />
              </label>
              <label>
                Status:
                <input
                  name="newDeviceStatus"
                  type="text"
                  value={newDevice.status}
                  onChange={(event) =>
                    setNewDevice({ ...newDevice, status: event.target.value })
                  }
                />
              </label>
              <label>
                Severity:
                <input
                  name="newDeviceSeverity"
                  type="text"
                  value={newDevice.severity}
                  onChange={(event) =>
                    setNewDevice({ ...newDevice, severity: event.target.value })
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

export default Devices;

