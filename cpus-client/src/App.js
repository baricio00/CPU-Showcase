import React, { createContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import CPUsList from './components/CPUsList';
import CPUDetail from './components/CPUDetail';
import axios from 'axios';

function App() {
  const [cpus, setCpus] = useState([]); 
  const [selectedCpu, setSelectedCpu] = useState(null);
  const [sockets, setSockets] = useState([]);
  const [isMobileView, setIsMobileView] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const { showMessage } = useToast();

  useEffect(() => {

    const handleResize = () => {
      const isMobile = window.innerWidth <= 530;
      setIsMobileView(isMobile);
      if (!selectedCpu && isMobile) {
        setViewMode('list');
      } else if (selectedCpu && isMobile) {
        setViewMode('details');
      } else{
        setViewMode('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    
    handleResize();

    axios.get('http://localhost:5000/cpus')
      .then(response => setCpus(response.data))
      .catch(error => {
        console.error('Error fetching CPUs:', error);
        showMessage(false, 'Error fetching CPUs');
      });

    axios.get('http://localhost:5000/sockets')
      .then(response => setSockets(response.data))
      .catch(error => {
        console.error('Error fetching sockets:', error);
        showMessage(false, 'Error fetching sockets');
      });

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [selectedCpu]);

  const handleSelectCPU = (cpu) => {
    axios.get('http://localhost:5000/cpu/' + cpu.id)
      .then(response => {
        setSelectedCpu(response.data);
        if (isMobileView) {
          setViewMode('details');
        }
      })
      .catch(error => {
        console.error('Error fetching CPU:', error);
        showMessage(false, 'Error fetching CPU');
      });
    };

  const handleCloseDetails = () => {
    setSelectedCpu(null);
    if (isMobileView) {
      setViewMode('list');
    }
  };

  const handleUpdateCPU = (updatedCpu) => {
    setCpus(cpus.map(cpu => (cpu.id === updatedCpu.id ? updatedCpu : cpu)));
    setSelectedCpu(updatedCpu);
  };

  if(viewMode === 'desktop' && !isMobileView){
    return(
      <div class="App">
        <div class="container">
          <div class="list">
            <CPUsList cpus={cpus} onSelectCPU={handleSelectCPU} />
          </div>
          <div class="details" id="details">
            {selectedCpu && (
              <CPUDetail 
                cpu={selectedCpu} 
                onClose={handleCloseDetails} 
                onUpdate={handleUpdateCPU} 
                sockets={sockets}
                isMobileView={isMobileView}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="App">
      <div class="container">
        {viewMode === 'list' && (
          <div className="list">
            <CPUsList cpus={cpus} onSelectCPU={handleSelectCPU} />
          </div>
        )}
        {viewMode === 'details' && selectedCpu && (
          <div className="details" id="details">
            <CPUDetail 
              cpu={selectedCpu} 
              onClose={handleCloseDetails} 
              onUpdate={handleUpdateCPU} 
              sockets={sockets} 
              isMobileView={isMobileView} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;