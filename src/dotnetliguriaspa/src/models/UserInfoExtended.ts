import {OidcUserInfo} from "@axa-fr/react-oidc/dist/vanilla/vanillaOidc";

export interface UserInfoExtended extends OidcUserInfo {
    roles: string[]
}