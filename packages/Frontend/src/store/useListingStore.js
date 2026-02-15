import { create } from "zustand";
import { fetchBlogsList, fetchGamesList } from "@/http/listingsApi";

const createListingStore = (fetcher) =>
  create((set) => ({
    items: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
    currentPage: 1,
    activeFilter: "all",
    searchQuery: "",
    fetchItems: async () => {
      set({ isLoading: true, error: null });
      try {
        const items = await fetcher();
        set({ items, isLoading: false, hasLoaded: true });
      } catch (error) {
        set({
          isLoading: false,
          hasLoaded: true,
          error: error.message || "Failed to load data",
        });
      }
    },
    setCurrentPage: (currentPage) => set({ currentPage }),
    setActiveFilter: (activeFilter) => set({ activeFilter, currentPage: 1 }),
    setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
    reset: () =>
      set({
        items: [],
        isLoading: false,
        hasLoaded: false,
        error: null,
        currentPage: 1,
        activeFilter: "all",
        searchQuery: "",
      }),
  }));

export const useBlogsListingStore = createListingStore(fetchBlogsList);
export const useGamesListingStore = createListingStore(fetchGamesList);
