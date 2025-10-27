// services/analyticsService.js
export const analyticsService = {
    async getTopPlatos(filtros = {}) {
        try {
            const queryParams = new URLSearchParams();
            if (filtros.fechaInicio) queryParams.append('fechaInicio', filtros.fechaInicio);
            if (filtros.fechaFin) queryParams.append('fechaFin', filtros.fechaFin);

            const response = await fetch(`/api/analytics/top-platos?${queryParams}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching top platos:', error);
            throw error;
        }
    },

    async getVentasPorCategoria(filtros = {}) {
        try {
            const queryParams = new URLSearchParams();
            if (filtros.fechaInicio) queryParams.append('fechaInicio', filtros.fechaInicio);
            if (filtros.fechaFin) queryParams.append('fechaFin', filtros.fechaFin);

            const response = await fetch(`/api/analytics/ventas-categoria?${queryParams}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching ventas por categoria:', error);
            throw error;
        }
    }
};