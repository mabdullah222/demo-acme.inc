import { useQuery } from '@tanstack/react-query';
import {
  getInventory,
  getInventorySearchResults,
  getInventoryItemById,
} from '@/lib/actions/inventory-actions';

export const getInventoryQuery = (query: string) =>
  useQuery({
    queryKey: ['inventory', query],
    queryFn: () => getInventory(query),
    staleTime: 3 * 60 * 1000,
  });

export const getInventoryBySearchQuery = (q: string, enabled: boolean) =>
  useQuery({
    queryKey: ['inventory', 'search', q],
    queryFn: () => getInventorySearchResults(q),
    enabled,
  });

export const getInventoryItemByIdQuery = (inventoryId: string, enabled = true) =>
  useQuery({
    queryKey: ['inventory', 'id', inventoryId],
    queryFn: () => getInventoryItemById(inventoryId),
    enabled: !!inventoryId && enabled,
  });
