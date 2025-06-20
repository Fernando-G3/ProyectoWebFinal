// Original file: protos/images.proto


export interface uploadImageEventPetition {
  'idImage'?: (number);
  'fileName'?: (string);
  'content'?: (Buffer | Uint8Array | string);
}

export interface uploadImageEventPetition__Output {
  'idImage'?: (number);
  'fileName'?: (string);
  'content'?: (Buffer);
}
