import { useState } from 'react';

const Dashboard = () => {
    const [consulta, setConsulta] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Consulta enviada:', consulta);
        // Aquí procesarías la consulta
        alert(`Consulta enviada: ${consulta}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        placeholder="Escribe tu consulta aquí..."
                        className="flex-1 p-3 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Dashboard;