import React from 'react';
import './CPUsList.css';

const CPUsList = ({ cpus, onSelectCPU, selectedCpuId }) => {
  return (
    <div>
      <ul>
        {cpus.map(cpu => (
          <li 
          class={`single-cpu ${cpu.id === selectedCpuId ? 'selected' : ''}`} 
          key={cpu.id} 
          onClick={() => onSelectCPU(cpu)}>
            <div class="cpu-name">
              <div class="cpu-brand">
                {cpu.brand}
              </div>
              <div class="cpu-model">
                {cpu.model}
              </div>
            </div>
            <div class="cpu-socket">
              {cpu.socket}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CPUsList;
