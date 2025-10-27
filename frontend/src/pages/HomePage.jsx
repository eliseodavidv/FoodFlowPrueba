const HomePage = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Bienvenido a FoodFlow
                </h1>
                <p className="text-gray-600 mb-4">
                    Sistema integral de gestión para restaurantes con arquitectura de microservicios
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Clientes</h3>
                    <p className="text-blue-600">Gestión completa de clientes y reservas</p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Menú</h3>
                    <p className="text-green-600">Catálogo digital de platos y bebidas</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Pedidos</h3>
                    <p className="text-purple-600">Sistema de órdenes y facturación</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Analytics</h3>
                    <p className="text-orange-600">Reportes y estadísticas del negocio</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Microservicios Activos</h2>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span>ms-customers (Puerto 8001)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span>ms-orders (Puerto 8002)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span>ms-menu (Puerto 8003)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span>ms-history (Puerto 8004)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span>ms-analytics (Puerto 8010) </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;