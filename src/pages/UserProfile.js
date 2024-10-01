import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [newMachine, setNewMachine] = useState({ machine: '', output: '', date: '' });

  const handleAddMachine = async () => {
    try {
      // Wysyłanie danych na serwer za pomocą POST
      const response = await axios.post('http://localhost:4000/machines', newMachine);
      console.log('Maszyna dodana:', response.data);
      setNewMachine({ machine: '', output: '', date: '' }); // Reset formularza po dodaniu maszyny
    } catch (error) {
      console.error('Błąd dodawania maszyny:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel użytkownika</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Dodaj nową maszynę</h2>
        <input
          type="text"
          placeholder="Nazwa maszyny"
          className="p-2 border border-gray-300 rounded mr-2"
          value={newMachine.machine}
          onChange={(e) => setNewMachine({ ...newMachine, machine: e.target.value })}
        />
        <input
          type="number"
          placeholder="Wydajność (%)"
          className="p-2 border border-gray-300 rounded mr-2"
          value={newMachine.output}
          onChange={(e) => setNewMachine({ ...newMachine, output: e.target.value })}
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded mr-2"
          value={newMachine.date}
          onChange={(e) => setNewMachine({ ...newMachine, date: e.target.value })}
        />
        <button onClick={handleAddMachine} className="bg-green-500 text-white p-2 rounded">Dodaj maszynę</button>
      </div>
    </div>
  );
};

export default UserProfile;


