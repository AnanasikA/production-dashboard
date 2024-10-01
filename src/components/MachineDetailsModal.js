import React from 'react';

const MachineDetailsModal = ({ machine, onClose }) => {
  if (!machine) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Szczegóły maszyny: {machine.machine}</h2>
        <p>Wydajność: {machine.output}%</p>
        <p>Data: {machine.date}</p>
        {/* Możesz dodać więcej szczegółowych danych tutaj */}
        
        <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded">Zamknij</button>
      </div>
    </div>
  );
};

export default MachineDetailsModal;
