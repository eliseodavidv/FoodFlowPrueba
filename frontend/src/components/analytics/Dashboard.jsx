import { useState } from 'react';

const Dashboard = () => {
    const [consulta, setConsulta] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultados, setResultados] = useState(null);
    const [error, setError] = useState(null);

    // Función para parsear los resultados de Athena
    const parseAthenaResults = (data) => {
        if (!data.ResultSet || !data.ResultSet.Rows || data.ResultSet.Rows.length === 0) {
            return { headers: [], rows: [] };
        }

        const rows = data.ResultSet.Rows;

        // La primera fila es el encabezado
        const headers = rows[0].Data.map(cell => cell.VarCharValue);

        // Las demás filas son los datos
        const dataRows = rows.slice(1).map(row => {
            return row.Data.map(cell => cell.VarCharValue || '');
        });

        return { headers, rows: dataRows };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!consulta.trim()) {
            alert('Por favor escribe una consulta SQL');
            return;
        }

        setLoading(true);
        setError(null);
        setResultados(null);

        try {
            const response = await fetch('http://52.73.193.181:8010/analytics/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sql: consulta,
                    async_query: false,
                    // database: 'tu_base_de_datos' // Opcional
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error en la consulta');
            }

            const data = await response.json();
            setResultados(data);
            console.log('Resultados completos:', data);

        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Renderizar la tabla
    const renderTable = () => {
        if (!resultados || !resultados.ResultSet) return null;

        const { headers, rows } = parseAthenaResults(resultados);

        if (headers.length === 0) {
            return <p className="text-gray-600">No se encontraron resultados</p>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header, idx) => (
                            <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-gray-50">
                            {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className="border border-gray-300 px-4 py-2">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <p className="text-sm text-gray-600 mt-4">
                    Total de filas: <strong>{rows.length}</strong>
                </p>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard de Analytics</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col gap-2">
                    <textarea
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        placeholder="Escribe tu consulta SQL aquí...&#10;Ejemplo: SELECT * FROM tabla LIMIT 10"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-24"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-fit"
                        disabled={loading}
                    >
                        {loading ? 'Ejecutando consulta...' : 'Ejecutar Consulta'}
                    </button>
                </div>
            </form>

            {/* Indicador de carga */}
            {loading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Resultados */}
            {resultados && !loading && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Resultados</h2>
                        {resultados.execution_id && (
                            <span className="text-xs text-gray-500">
                                ID: {resultados.execution_id}
                            </span>
                        )}
                    </div>

                    {renderTable()}
                </div>
            )}
        </div>
    );
};

export default Dashboard;