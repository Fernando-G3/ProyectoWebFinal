import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { filemanagementClient as _imagespackage_filemanagementClient, filemanagementDefinition as _imagespackage_filemanagementDefinition } from './imagespackage/filemanagement';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  imagespackage: {
    downloadImageEventPetition: MessageTypeDefinition
    downloadImageEventResponse: MessageTypeDefinition
    filemanagement: SubtypeConstructor<typeof grpc.Client, _imagespackage_filemanagementClient> & { service: _imagespackage_filemanagementDefinition }
    uploadImageEventPetition: MessageTypeDefinition
    uploadImageEventResponse: MessageTypeDefinition
  }
}

