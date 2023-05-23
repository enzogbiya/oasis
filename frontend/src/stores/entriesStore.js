import create from "zustand";

const useEntryStore = create((set) => ({
	entries: [],
	setEntries: (newEntries) => set(() => ({ entries: newEntries })),
	addEntry: (newEntry) => set((state) => ({ entries: [...state.entries, newEntry] })),
	deleteEntry: (id) => set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) })),
}));

export default useEntryStore;
