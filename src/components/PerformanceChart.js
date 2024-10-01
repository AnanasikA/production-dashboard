import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Rejestracja komponentów
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.machine),
    datasets: [
      {
        label: 'Wydajność (%)',
        data: data.map(item => item.output),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Wydajność Maszyn',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PerformanceChart;
