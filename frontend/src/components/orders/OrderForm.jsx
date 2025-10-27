import { useState, useEffect } from 'react';
import { ordersService } from '../../services/ordersService';
import { menuService } from '../../services/menuService';

const OrderForm = ({ onOrderCreated }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({
        cliente_id: '',
        fecha: new Date().toISOString().split('T')[0],
        platos: [],
        notas: ''
    });
    const [selectedPlato, setSelectedPlato] = useState('');
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        loadMenu();
    }, []);

    const loadMenu = async () => {
        try {
            const response = await menuService.getAllMenuItems();
            setMenuItems(response.data.data || []);
        } catch (error) {
            console.error('Error loading menu:', error);
        }
    };

    const addPlato = () => {
        if (selectedPlato && cantidad > 0) {
            const plato = menuItems.find(item => item._id === selectedPlato);
            setFormData({
                ...formData,
                platos: [...formData.platos, {
                    plato_id: selectedPlato,
                    cantidad: cantidad,
                    nombre: plato.nombre
                }]
            });
            setSelectedPlato('');
            setCantidad(1);
        }
    };

    const removePlato = (index) => {
        const newPlatos = formData.platos.filter((_, i) => i !== index);
        setFormData({ ...formData, platos: newPlatos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                cliente_id: parseInt(formData.cliente_id),
                fecha: formData.fecha,
                platos: formData.platos.map(p => ({
                    plato_id: p.plato_id,
                    cantidad: p.cantidad
                })),
                notas: formData.notas
            };
            await ordersService.createOrder(orderData);
            alert('Pedido creado exitosamente');
            setFormData({ cliente_id: '', fecha: new Date().toISOString().split('T')[0], platos: [], notas: '' });
            if (onOrderCreated) onOrderCreated();
        } catch (error) {
            alert('Error al crear pedido: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID Cliente</label>
                    <input
                        type="number"
                        value={formData.cliente_id}
                        onChange={(e) => setFormData({...formData, cliente_id: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                    />
                </div>
            </div>

            <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Agregar Platos</h3>
                <div className="flex gap-2">
                    <select
                        value={selectedPlato}
                        onChange={(e) => setSelectedPlato(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm p-2 border"
                    >
                        <option value="">Seleccionar plato...</option>
                        {menuItems.map(item => (
                            <option key={item._id} value={item._id}>
                                {item.nombre} - S/ {item.precio}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                        className="w-20 rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                    <button
                        type="button"
                        onClick={addPlato}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            {formData.platos.length > 0 && (
                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Platos seleccionados:</h3>
                    <ul className="space-y-2">
                        {formData.platos.map((plato, index) => (
                            <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span>{plato.nombre} x {plato.cantidad}</span>
                                <button
                                    type="button"
                                    onClick={() => removePlato(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Notas</label>
                <textarea
                    value={formData.notas}
                    onChange={(e) => setFormData({...formData, notas: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    rows="3"
                />
            </div>

            <button
                type="submit"
                disabled={formData.platos.length === 0}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 disabled:bg-gray-400"
            >
                Crear Pedido
            </button>
        </form>
    );
};

export default OrderForm;