import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPerformanceData, addMachine, deleteMachine } from '../redux/slices/performanceSlice';
import PerformanceChart from '../components/PerformanceChart';
import MachineDetailsModal from '../components/MachineDetailsModal';
import UserManagement from '../pages/UserManagement';
import io from 'socket.io-client';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode'; // Poprawny import
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const performanceData = useSelector(state => state.performance.data || []); // Zapewnienie, że performanceData nie jest undefined
  const [filteredData, setFilteredData] = useState(performanceData);
  const [filter, setFilter] = useState('');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [newMachine, setNewMachine] = useState({ machine: '', output: '', date: '' });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); // Używamy nazwanej funkcji jwtDecode
      setUserRole(decodedToken.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Wydajność maszyn', 20, 10);

    const tableColumn = ['Nazwa maszyny', 'Wydajność (%)', 'Data'];
    const tableRows = performanceData.map(item => [item.machine, item.output, item.date]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('performance_data.pdf');
  };

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('performanceDataUpdate', newData => {
      dispatch(setPerformanceData(newData));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(
      performanceData.filter(item => item.machine.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter, performanceData]);

  const handleAddMachine = () => {
    const id = performanceData.length + 1;
    dispatch(addMachine({ ...newMachine, id }));
    setNewMachine({ machine: '', output: '', date: '' });
  };

  const handleDeleteMachine = id => {
    dispatch(deleteMachine(id));
  };

  useEffect(() => {
    performanceData.forEach(machine => {
      if (machine.output < 50) {
        toast.error(`Niska wydajność ${machine.machine}: ${machine.output}%`);
      }
    });
  }, [performanceData]);

  if (userRole === 'admin') {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Panel Administracyjny</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors mb-6"
        >
          Wyloguj się
        </button>
        <UserManagement /> {/* Panel administracyjny */}
      </div>
    );
  } else if (userRole === 'manager') {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Panel Menedżerski</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors mb-6"
        >
          Wyloguj się
        </button>
  
        <PerformanceChart data={filteredData} /> {/* Wykres wydajności */}
  
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white p-2 rounded mb-4"
        >
          Pobierz PDF
        </button>
  
        <CSVLink
          data={performanceData}
          filename={'performance_data.csv'}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Pobierz CSV
        </CSVLink>
  
        {/* Lista dodanych maszyn */}
        <div className="grid grid-cols-2 gap-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{item.machine}</h2>
              <p>Wydajność: {item.output}%</p>
              <p>Data: {item.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Wydajności</h1>

      <button
        onClick={handleDownloadPDF}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Pobierz PDF
      </button>

      <CSVLink
        data={performanceData}
        filename={'performance_data.csv'}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Pobierz CSV
      </CSVLink>

      <input
        type="text"
        placeholder="Filtruj według maszyny"
        className="p-2 border border-gray-300 rounded mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Dodaj nową maszynę</h2>
        <input
          type="text"
          placeholder="Nazwa maszyny"
          className="p-2 border border-gray-300 rounded mr-2"
          value={newMachine.machine}
          onChange={e => setNewMachine({ ...newMachine, machine: e.target.value })}
        />
        <input
          type="number"
          placeholder="Wydajność (%)"
          className="p-2 border border-gray-300 rounded mr-2"
          value={newMachine.output}
          onChange={e => setNewMachine({ ...newMachine, output: e.target.value })}
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded mr-2"
          value={newMachine.date}
          onChange={e => setNewMachine({ ...newMachine, date: e.target.value })}
        />
        <button onClick={handleAddMachine} className="bg-green-500 text-white p-2 rounded">
          Dodaj maszynę
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredData.map(item => (
          <div
            key={item.id}
            className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
            onClick={() => setSelectedMachine(item)}
          >
            <h2 className="text-lg font-semibold">{item.machine}</h2>
            <p>Wydajność: {item.output}%</p>
            <p>Data: {item.date}</p>
            <button
              onClick={() => handleDeleteMachine(item.id)}
              className="bg-red-500 text-white p-2 rounded mt-2"
            >
              Usuń maszynę
            </button>
          </div>
        ))}
      </div>

      <PerformanceChart data={filteredData} />

      <MachineDetailsModal machine={selectedMachine} onClose={() => setSelectedMachine(null)} />

      <ToastContainer />
    </div>
  );
};

export default Dashboard;










