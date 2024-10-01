import PerformanceChart from '../components/PerformanceChart'; // Zakładam, że masz komponent wykresu wydajności

const ManagerDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Przegląd wydajności maszyn</h2>
      <PerformanceChart />
    </div>
  );
};

export default ManagerDashboard;