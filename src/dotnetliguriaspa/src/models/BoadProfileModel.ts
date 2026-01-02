export interface BoardProfileModel {
  id: string;
  boardId: string;
  name: string;
  order?: number;
  email: string;
  imageUrl: string;
  profileImageUrl: string;
  profileBio: string;
  description?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  facebookUrl?: string;
  isActive?: boolean;
}
