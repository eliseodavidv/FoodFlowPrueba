import Dashboard from '../components/analytics/Dashboard';

const AnalyticsPage = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Analytics</h1>
                <p className="text-gray-600">Reportes y estadísticas del restaurante</p>
                <p className="text-sm text-yellow-600 mt-2">
                </p>
            </div>
            <Dashboard />
        </div>
    );
};

export default AnalyticsPage;