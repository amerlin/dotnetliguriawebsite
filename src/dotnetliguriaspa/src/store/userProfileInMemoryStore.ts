import { create } from "zustand";
import { ProfileElement } from "./profileElement";

export const userProfileInMemoryStore = create<ProfileElement>((set) => ({
  profileSaved: false,
  setProfileSaved: (value) => set(() => ({ profileSaved: value })),
}));
