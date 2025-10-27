const MenuItemCard = ({ item }) => {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.nombre}</h3>
                <span className={`px-2 py-1 text-xs rounded ${item.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.disponible ? 'Disponible' : 'No disponible'}
        </span>
            </div>

            <p className="text-sm text-gray-600 mb-3">{item.descripcion}</p>

            <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-orange-600">S/ {item.precio}</span>
                <span className="text-sm text-gray-500">{item.tiempo_preparacion} min</span>
            </div>

            <div className="mb-3">
        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
          {item.categoria}
        </span>
            </div>

            {item.vegetariano && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">
          Vegetariano
        </span>
            )}
            {item.vegano && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          Vegano
        </span>
            )}
        </div>
    );
};

export default MenuItemCard;