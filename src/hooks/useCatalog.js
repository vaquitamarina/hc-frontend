import { useQuery } from '@tanstack/react-query';
import { fetchCatalog } from '@services/fetchCatalog.js';
import { fetchCatalogNameById } from '@services/fetchCatalog.js';

/**
 * Hook genérico para obtener cualquier catálogo
 */
export const useCatalog = (catalogName) => {
  return useQuery({
    queryKey: ['catalog', catalogName],
    queryFn: () => fetchCatalog(catalogName),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

/**
 * Hook específico para obtener grupo sanguíneo
 */
export const useBloodType = () => {
  return useQuery({
    queryKey: ['catalog', 'catalogo_grupo_sanguineo'],
    queryFn: () => fetchCatalog('catalogo_grupo_sanguineo'),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook para obtener el nombre de un id de catálogo específico
 */
export const useCatalogNameById = (catalogName, id, options = {}) => {
  return useQuery({
    queryKey: ['catalog-name', catalogName, id],
    queryFn: () => fetchCatalogNameById(catalogName, id),
    enabled: !!catalogName && !!id,
    ...options,
  });
};
