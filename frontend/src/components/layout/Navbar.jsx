import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-orange-600 text-white'
            : 'text-gray-300 hover:bg-orange-700 hover:text-white';
    };

    return (
        <nav className="bg-orange-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-white">
                            🍴 FoodFlow
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Link to="/" className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/')}`}>
                            Inicio
                        </Link>
                        <Link to="/customers" className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/customers')}`}>
                            Clientes
                        </Link>
                        <Link to="/menu" className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/menu')}`}>
                            Menú
                        </Link>
                        <Link to="/orders" className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/orders')}`}>
                            Pedidos
                        </Link>
                        <Link to="/analytics" className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive('/analytics')}`}>
                            Analytics
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;