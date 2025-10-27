import { useState } from 'react';
import { customersService } from '../../services/customersService';

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        customer_id: '',
        date: '',
        table_number: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reservationData = {
                customer_id: parseInt(formData.customer_id),
                date: new Date(formData.date).toISOString(),
                table_number: parseInt(formData.table_number)
            };
            await customersService.createReservation(reservationData);
            alert('Reserva creada exitosamente');
            setFormData({ customer_id: '', date: '', table_number: '' });
        } catch (error) {
            alert('Error al crear reserva');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block text-sm font-medium text-gray-700">ID del Cliente</label>
                <input
                    type="number"
                    value={formData.customer_id}
                    onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
                <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Número de Mesa</label>
                <input
                    type="number"
                    value={formData.table_number}
                    onChange={(e) => setFormData({...formData, table_number: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
                Crear Reserva
            </button>
        </form>
    );
};

export default ReservationForm;