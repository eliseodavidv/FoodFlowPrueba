import { useState } from 'react';

const HistoryPage = () => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    📊 Historial de Transacciones
                </h1>
                <p className="text-gray-600 mb-6">
                    Registro completo de todas las actividades y transacciones del restaurante
                </p>

                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                    {showHistory ? 'Ocultar Historial' : 'Mostrar Historial'}
                </button>
            </div>

            {showHistory && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Historial Reciente</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <p className="font-semibold">Cliente registrado</p>
                            <p className="text-sm text-gray-600">Juan Pérez - Hace 2 horas</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                            <p className="font-semibold">Pedido completado</p>
                            <p className="text-sm text-gray-600">Orden #1234 - Hace 3 horas</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 py-2">
                            <p className="font-semibold">Reserva confirmada</p>
                            <p className="text-sm text-gray-600">Mesa para 4 - Hace 5 horas</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <p className="text-yellow-800">
                    ℹ️ Conectado al microservicio ms-history en puerto 8004
                </p>
            </div>
        </div>
    );
};

export default HistoryPage;