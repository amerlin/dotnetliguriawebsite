import { OidcUserInfo } from "@axa-fr/react-oidc/dist/vanilla/vanillaOidc";

export interface UserInfoExtendedModel extends OidcUserInfo {
  roles: string[];
}
