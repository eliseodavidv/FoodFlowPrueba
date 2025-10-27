import { useState } from 'react';
import CustomerList from '../components/customers/CustomerList';
import CustomerForm from '../components/customers/CustomerForm';
import ReservationForm from '../components/customers/ReservationForm';

const CustomersPage = () => {
    const [activeTab, setActiveTab] = useState('list');

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
                <div className="border-b">
                    <nav className="flex space-x-4 px-6">
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`py-4 px-2 font-medium border-b-2 transition ${
                                activeTab === 'list'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Lista de Clientes
                        </button>
                        <button
                            onClick={() => setActiveTab('add')}
                            className={`py-4 px-2 font-medium border-b-2 transition ${
                                activeTab === 'add'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Agregar Cliente
                        </button>
                        <button
                            onClick={() => setActiveTab('reservation')}
                            className={`py-4 px-2 font-medium border-b-2 transition ${
                                activeTab === 'reservation'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Nueva Reserva
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'list' && <CustomerList />}
                    {activeTab === 'add' && <CustomerForm />}
                    {activeTab === 'reservation' && <ReservationForm />}
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;