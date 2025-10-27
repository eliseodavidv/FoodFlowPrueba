import { useState, useEffect } from 'react';
import { customersService } from '../../services/customersService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const response = await customersService.getAllCustomers();
            setCustomers(response.data);
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este cliente?')) {
            try {
                await customersService.deleteCustomer(id);
                loadCustomers();
            } catch (error) {
                alert('Error al eliminar cliente');
            }
        }
    };

    if (loading) return <div className="text-center py-8">Cargando clientes...</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button
                                onClick={() => handleDelete(customer.id)}
                                className="text-red-600 hover:text-red-900"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;