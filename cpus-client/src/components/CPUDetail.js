import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CPUDetail.css';
import { useToast } from '../ToastContext';
import intelLogo from '../images/intel-logo.png';
import amdLogo from '../images/amd-logo.png';
import clockspeedIcon from '../images/clockspeed.png';
import coresIcon from '../images/cores.png';
import threadsIcon from '../images/threads.png';
import tdpIcon from '../images/tdp.png';
import priceIcon from '../images/price.png';
import backIcon from '../images/back.png';

const CPUDetail = ({ cpu, onClose, onUpdate, sockets, isMobileView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cpuDetails, setCpuDetails] = useState(cpu);
  const { showMessage } = useToast();

  useEffect(() => {
    setCpuDetails(cpu);
  }, [cpu]);

  const handleEditClick = () => {
    if (isEditing) {
      axios.put(`http://localhost:5000/cpu/${cpuDetails.id}`, cpuDetails)
        .then(() => {
          axios.get(`http://localhost:5000/cpu/${cpuDetails.id}`)
            .then(response => {
              onUpdate(response.data);
              setCpuDetails(response.data);
              setIsEditing(false);
              showMessage(true, 'CPU updated successfully');
            })
            .catch(error => {
              console.error('Error fetching updated CPU:', error);
              showMessage(false, 'Error updating CPU');
            });
        })
        .catch(error => {
          console.error('Error updating CPU:', error);
          showMessage(false, 'Error updating CPU');
        });
    }else {
      setIsEditing(true); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCpuDetails({ ...cpuDetails, [name]: value });
  };

  const handleCloseClick = () => {
    onClose();
  };

  const viewMode = (
    <div class="details-list">
      {isMobileView && 
        <div class="buttons">
          <button class="back-button" onClick={handleCloseClick}>
            <img 
              class="back-icon" 
              src={backIcon}
              width="20px"
              height="20px"></img>
            <div class="back-text">Back</div>
          </button>
          <button class="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      }
      <div class="details-1">
        <div class="detail-name">
          <div class="detail-brand-name">{cpuDetails.brand} {cpuDetails.model}</div>
          <div class="detail-socket">{cpuDetails.socket_name}</div>
        </div>
        <div class="logo">
          <img 
            id="logo-img" 
            src={cpuDetails.brand === 'Intel' ? intelLogo : amdLogo} 
            alt={`${cpuDetails.brand} logo`}
            width="85px"
            height="85px"
          />
        </div>
      </div>
      <div class="details-2">
        <div class="detail">
          <div class="detail-type">
            <img 
            class="detail-image" 
            src={clockspeedIcon}
            width="20px"
            height="22px"
            ></img>
            <div class="detail-value">Clockspeed:</div>
          </div>
          <div>{cpuDetails.clockspeed} GHz</div>
        </div>
        <div class="detail">
          <div class="detail-type">
            <img 
            class="detail-image" 
            src={coresIcon}
            width="20px"
            height="22px"
            ></img>
            <div class="detail-value">Cores:</div>
          </div>
          <div>{cpuDetails.cores}</div>
        </div>
        <div class="detail">
          <div class="detail-type">
            <img 
            class="detail-image" 
            src={threadsIcon}
            width="20px"
            height="22px"
            ></img>
            <div class="detail-value">Threads:</div>
          </div>
          <div>{cpuDetails.threads}</div>
        </div>
        <div class="detail">
          <div class="detail-type">
            <img 
            class="detail-image" 
            src={tdpIcon}
            width="20px"
            height="22px"
            ></img>
            <div class="detail-value">TDP:</div>
          </div>
          <div>{cpuDetails.tdp} W</div>
        </div>
        <div class="detail">
          <div class="detail-type">
            <img 
            class="detail-image" 
            src={priceIcon}
            width="20px"
            height="22px"
            ></img>
            <div class="detail-value">Price:</div>
          </div>
          <div>€ {cpuDetails.price_eur}</div>
        </div>
      </div>
      {!isMobileView &&
      <div class="details-3">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleCloseClick}>Close</button>
      </div>
      }
    </div>
  )

  const editMode = (
    <div class="edit-form">
      {isMobileView && 
        <div class="buttons-edit-mobile">
          <div class="cancel-button" onClick={handleCloseClick}>
            Cancel
          </div>
          <div class="save-button" onClick={handleEditClick}>
            Save
          </div>
        </div>
      }
      <h3>Edit {cpuDetails.brand} {cpuDetails.model}</h3>
      <div class="form-group">
        <label htmlFor="brand">Brand:</label>
        <select name="brand" value={cpuDetails.brand} onChange={handleInputChange}>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
      </div>
      <div class="form-group">
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" value={cpuDetails.model} onChange={handleInputChange} placeholder="Model" required />
      </div>
      <div class="form-group">
        <label htmlFor="socket">Socket:</label>
        <select name="socket_name" value={cpuDetails.socket_name || ''} onChange={handleInputChange}>
          <option value=""></option>
          {sockets.map(socket => (
            <option key={socket.name} value={socket.name}>{socket.name}</option>
          ))}
        </select>
      </div>
      <div class="form-group">
        <label htmlFor="clockspeed">Clockspeed:</label>
        <input type="number" id="clockspeed" name="clockspeed" value={cpuDetails.clockspeed} onChange={handleInputChange} placeholder="Clockspeed" required />
      </div>
      <div class="form-group">
        <label htmlFor="cores">Cores:</label>
        <input type="number" id="cores" name="cores" value={cpuDetails.cores} onChange={handleInputChange} placeholder="Cores" required />
      </div>
      <div class="form-group">
        <label htmlFor="threads">Threads:</label>
        <input type="number" id="threads" name="threads" value={cpuDetails.threads} onChange={handleInputChange} placeholder="Threads" required />
      </div>
      <div class="form-group">
        <label htmlFor="tdp">TDP:</label>
        <input type="number" id="tdp" name="tdp" value={cpuDetails.tdp} onChange={handleInputChange} placeholder="TDP" required />
      </div>
      <div class="form-group">
        <label htmlFor="price_eur">Price (EUR):</label>
        <input type="number" id="price_eur" name="price_eur" value={cpuDetails.price_eur} onChange={handleInputChange} placeholder="Price" required />
      </div>
      {!isMobileView &&
        <div class="buttons-edit">
          <button onClick={handleEditClick}>Save</button>
          <button onClick={handleCloseClick}>Cancel</button>
        </div>
      }
    </div>
  )

  return (
    <>
      {isEditing ? editMode : viewMode}
    </>
  );
};

export default CPUDetail;
