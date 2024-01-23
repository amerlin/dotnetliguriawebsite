import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ProfileElement } from "./profileElement";

export const userProfileLocalStorageStore = create<ProfileElement>()(
  devtools(
    persist(
      (set) => ({
        profileSaved: false,
        setProfileSaved: (value) => set(() => ({ profileSaved: value })),
      }),
      { name: "profileStore" }
    )
  )
);
