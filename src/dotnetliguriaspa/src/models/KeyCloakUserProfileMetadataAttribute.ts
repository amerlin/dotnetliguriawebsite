export interface KeyCloakUserProfileMetadataAttribute {
  name: string;
  displaName: string;
  required: boolean;
  readonly: boolean;
  validators?: string[];
  // "validators": {
  //   "email": {
  //     "ignore.empty.value": true
  //   }
  // }
}

// export interface validators {
//   email: {
//     "ignore.empty.value": true;
//   };
// }
