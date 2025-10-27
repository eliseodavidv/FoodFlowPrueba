import MenuGrid from '../components/menu/MenuGrid';

const MenuPage = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800">Menú Digital</h1>
                <p className="text-gray-600">Explora nuestro catálogo de platos</p>
            </div>
            <MenuGrid />
        </div>
    );
};

export default MenuPage;