import { BoardProfileModel } from "../models/BoadProfileModel";

// API configuration
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:64561/api";

export const getBoardProfiles = async (): Promise<BoardProfileModel[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Board/Get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const boardProfiles: BoardProfileModel[] = await response.json();
    return boardProfiles;
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    throw error;
  }
};

export const getActiveBoardProfiles = async (): Promise<
  BoardProfileModel[]
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Board/Get?onlyActive=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const boardProfiles: BoardProfileModel[] = await response.json();
    return boardProfiles;
  } catch (error) {
    console.error("Error fetching active board profiles:", error);
    throw error;
  }
};
