import MotionHoc from "./MotionHoc";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeviceComponent = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [severity, setSeverity] = useState('');
  const [messages, setMessages] = useState([]);
  // const [lastMessage, setLastMessage] = useState('');
  useEffect(() => {
    const url = "https://localhost:44362/api/device";
    fetch(url + `/${id}`)
      .then(response => response.json())
      .then(data => {
        setDevice(data);
        setName(data.name);
        setStatus(data.status);
        setSeverity(data.severity);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSeverityChange = (event) => {
    setSeverity(event.target.value);
  };
  const handleUpdate = async () => {
    // const test = `https://localhost:44362/api/device/${id}`;
    // alert(test);
    const response = await fetch(`https://localhost:44362/api/device/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        status: status,
        severity: severity
      })
      
    });
    const data = await response.json();
    console.log(data);
    window.location.href = "/devices";
  };

  const handleDelete = async () => {
    await fetch(`https://localhost:44362/api/device/${id}`, {
      method: 'DELETE'
    });
    //const data = await response.json();
    //console.log(data);
    window.location.href = "/devices";
  };

  const handleConnect = async () => {
    
    const response = await fetch(`https://localhost:44362/api/device/connect/${id}`, {
      method: 'GET'
    });
    const data = await response.json();
    console.log(response);
    // alert(response);
    setMessages(data);
    // setLastMessage(response);
    //const data = await response.json();
    //console.log(data);
    //window.location.href = "/devices";

    
    
  };

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{device.name}</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Status:
        <input type="text" value={status} onChange={handleStatusChange} />
      </label>
      <label>
        Severity:
        <input type="text" value={severity} onChange={handleSeverityChange} />
      </label>
      <button onClick={handleUpdate} className="btn btn-primary">Save Changes</button>
      <button onClick={handleDelete} className="btn btn-secondary">Delete Device</button>
      <button onClick={handleConnect} className="btn btn-info">Connect</button>
      <label>
        
        {messages}
      </label>
    </div>
  );

};



const Device = MotionHoc(DeviceComponent);

export default Device;

