import { OidcUserInfo } from "@axa-fr/react-oidc";

export interface UserInfoExtendedModel extends OidcUserInfo {
  roles: string[];
}
