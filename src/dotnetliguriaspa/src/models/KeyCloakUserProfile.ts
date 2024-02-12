import { KeyCloakUserProfileMetadataAttribute } from "./KeyCloakUserProfileMetadataAttribute";

export interface KeyCloakUserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  userProfileMetadata: {
    attributes: KeyCloakUserProfileMetadataAttribute[];
    groups: string[];
  };
  attributes: {
    city: string[];
    locale: string[];
  };
}
