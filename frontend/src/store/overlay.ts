import { ReactNode } from "react";
import { create } from "zustand";

interface OverlayState {
    showOverlay: boolean;
    overlayContent: null | ReactNode;
    swapOverlayContent: (content: ReactNode) => void;
    toggleOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
    showOverlay: false,
    overlayContent: null,
    swapOverlayContent: (content) => set({overlayContent: content}),
    toggleOverlay: () => set((state) => ({showOverlay: !state.showOverlay})),
}));