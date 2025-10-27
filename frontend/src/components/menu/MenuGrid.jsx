import { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import MenuItemCard from './MenuItemCard';

const MenuGrid = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenu();
        loadCategories();
    }, []);

    const loadMenu = async () => {
        try {
            const response = await menuService.getAllMenuItems();
            setMenuItems(response.data.data || []);
        } catch (error) {
            console.error('Error loading menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await menuService.getCategories();
            setCategories(response.data.data || []);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const filteredItems = selectedCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.categoria === selectedCategory);

    if (loading) return <div className="text-center py-8">Cargando menú...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded ${selectedCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    >
                        Todos
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded ${selectedCategory === cat ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <MenuItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default MenuGrid;