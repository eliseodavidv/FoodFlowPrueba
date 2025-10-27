import { useState } from 'react';
import OrderForm from '../components/orders/OrderForm';
import { ordersService } from '../services/ordersService';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await ordersService.getAllOrders();
            setOrders(response.data || []);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Pedidos</h1>
                <OrderForm onOrderCreated={loadOrders} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Historial de Pedidos</h2>
                    <button
                        onClick={loadOrders}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                        Actualizar
                    </button>
                </div>

                {loading ? (
                    <p>Cargando...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">No hay pedidos registrados</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="border rounded p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-semibold">Pedido #{order.id}</p>
                                        <p className="text-sm text-gray-600">Cliente ID: {order.cliente_id}</p>
                                        <p className="text-sm text-gray-600">Estado: {order.estado}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">S/ {order.total?.toFixed(2)}</p>
                                        <p className="text-sm text-gray-600">{order.fecha}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;