import { KeyCloakUserProfileMetadataAttribute } from "./KeyCloakUserProfileMetadataAttribute";

export interface KeyCloakUserProfile {
  id: string | undefined;
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
    d_city: string[];
    d_prov: string[];
    d_factory_name: string[];
    d_factory_city: string[];
    d_factory_prov: string[];
    d_factory_role: string[];
    d_social_twitterX: string[];
    d_social_linkedin: string[];
    d_social_github: string[];
    d_privacy_consent: string[];
    d_consent: string[];
  };
}
