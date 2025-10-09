import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Scatter } from 'react-chartjs-2';
import { BarChart3, PieChart, Activity, Menu, X, TrendingUp, Users, Package, ShoppingCart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Componente BarChart
const BarChartComponent = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Ventas Mensuales',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas 2024',
        data: [120, 190, 300, 500, 200, 350],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Ventas 2023',
        data: [80, 150, 250, 400, 180, 300],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

// Componente PieChart
const PieChartComponent = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: 'Distribución de Productos',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  const data = {
    labels: ['Electrónica', 'Ropa', 'Alimentos', 'Libros', 'Hogar'],
    datasets: [
      {
        label: 'Ventas por Categoría',
        data: [300, 150, 200, 100, 250],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(59, 130, 246, 0.85)',
          'rgba(251, 191, 36, 0.85)',
          'rgba(34, 197, 94, 0.85)',
          'rgba(168, 85, 247, 0.85)',
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 15,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};

// Componente DotChart (Scatter)
const DotChartComponent = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Relación Precio vs Unidades Vendidas',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Precio ($)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Unidades Vendidas',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Productos',
        data: [
          { x: 10, y: 120 },
          { x: 25, y: 95 },
          { x: 50, y: 80 },
          { x: 75, y: 65 },
          { x: 100, y: 50 },
          { x: 150, y: 35 },
          { x: 200, y: 25 },
          { x: 300, y: 15 },
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        pointRadius: 8,
        pointHoverRadius: 12,
        pointBorderWidth: 2,
        pointBorderColor: '#ffffff',
      },
    ],
  };

  return <Scatter options={options} data={data} />;
};

// Componente de Estadísticas Rápidas
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`${color} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// Componente Principal del Dashboard
const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'analytics', name: 'Análisis', icon: PieChart },
    { id: 'reports', name: 'Reportes', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Panel de Administración
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
              AU
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen`}
        >
          <nav className="p-4">
            <div className="mb-6 px-4 py-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menú Principal</p>
            </div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Ventas Totales"
              value="$45,230"
              icon={TrendingUp}
              color="bg-gradient-to-br from-indigo-500 to-indigo-600"
              trend="+12.5%"
            />
            <StatCard
              title="Clientes"
              value="1,234"
              icon={Users}
              color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              trend="+8.2%"
            />
            <StatCard
              title="Productos"
              value="567"
              icon={Package}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              trend="+5.1%"
            />
            <StatCard
              title="Pedidos"
              value="890"
              icon={ShoppingCart}
              color="bg-gradient-to-br from-orange-500 to-orange-600"
              trend="+15.3%"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="h-80">
                <BarChartComponent />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="h-80">
                <PieChartComponent />
              </div>
            </div>
          </div>

          {/* Dot Chart */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 mb-8 border border-gray-100">
            <div className="h-96">
              <DotChartComponent />
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Actividad Reciente
              </h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition">
                Ver todo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '001', cliente: 'Juan Pérez', producto: 'Laptop HP', monto: '$899', estado: 'Completado' },
                    { id: '002', cliente: 'María García', producto: 'iPhone 15', monto: '$1,199', estado: 'Pendiente' },
                    { id: '003', cliente: 'Carlos López', producto: 'Smart TV', monto: '$599', estado: 'Completado' },
                    { id: '004', cliente: 'Ana Martínez', producto: 'Auriculares', monto: '$149', estado: 'En proceso' },
                  ].map((row, index) => (
                    <tr key={row.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">#{row.id}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{row.cliente}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{row.producto}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.monto}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center ${
                            row.estado === 'Completado'
                              ? 'bg-emerald-100 text-emerald-700'
                              : row.estado === 'Pendiente'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {row.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;