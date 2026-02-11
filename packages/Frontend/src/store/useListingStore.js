import { create } from "zustand";

const createListingStore = () =>
  create((set) => ({
    currentPage: 1,
    activeFilter: "all",
    searchQuery: "",
    setCurrentPage: (currentPage) => set({ currentPage }),
    setActiveFilter: (activeFilter) => set({ activeFilter, currentPage: 1 }),
    setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
    reset: () =>
      set({
        currentPage: 1,
        activeFilter: "all",
        searchQuery: "",
      }),
  }));

export const useBlogsListingStore = createListingStore();
export const useGamesListingStore = createListingStore();
