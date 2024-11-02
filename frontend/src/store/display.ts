import { ReactNode } from "react";
import { create } from "zustand";

interface DisplayStore {
    display: ReactNode[];
    swapDisplay: (newDisplay: ReactNode[]) => void;
}

export const useDisplayStore = create<DisplayStore>((set) => ({
    display: [],
    swapDisplay: (newDisplay) => set({display: newDisplay}),
}));