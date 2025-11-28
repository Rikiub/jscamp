import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobId = number;

export interface FavoritesStoreType {
	favorites: JobId[];

	add: (id: JobId) => void;
	remove: (id: JobId) => void;
	toggle: (id: JobId) => void;
	isFavorite: (id: JobId) => boolean;
}

export const useFavoritesStore = create<FavoritesStoreType>()(
	persist(
		(set, get) => ({
			favorites: [],

			add: (id) =>
				set((state) => ({
					favorites: [...state.favorites, id],
				})),

			remove: (id) =>
				set((state) => ({
					favorites: state.favorites.filter((j) => j !== id),
				})),

			toggle: (id) => {
				const { isFavorite, add, remove } = get();
				isFavorite(id) ? remove(id) : add(id);
			},

			isFavorite: (id) => get().favorites.includes(id),
		}),
		{ name: "favorite-jobs" },
	),
);
