import { WorkshopModel } from "../models/WorkshopModel";

// API configuration
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:64561/api";

export const getWorkshops = async (): Promise<WorkshopModel[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Workshop/Get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const boardProfiles: WorkshopModel[] = await response.json();
    return boardProfiles;
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    throw error;
  }
};

export const getWorkshopById = async (id: string): Promise<WorkshopModel> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Workshop/Get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Workshop with ID ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const workshop: WorkshopModel = await response.json();
    return workshop;
  } catch (error) {
    console.error("Error fetching workshop:", error);
    throw error;
  }
};
