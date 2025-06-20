// Original file: protos/images.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { downloadImageEventPetition as _imagespackage_downloadImageEventPetition, downloadImageEventPetition__Output as _imagespackage_downloadImageEventPetition__Output } from '../imagespackage/downloadImageEventPetition';
import type { downloadImageEventResponse as _imagespackage_downloadImageEventResponse, downloadImageEventResponse__Output as _imagespackage_downloadImageEventResponse__Output } from '../imagespackage/downloadImageEventResponse';
import type { uploadImageEventPetition as _imagespackage_uploadImageEventPetition, uploadImageEventPetition__Output as _imagespackage_uploadImageEventPetition__Output } from '../imagespackage/uploadImageEventPetition';
import type { uploadImageEventResponse as _imagespackage_uploadImageEventResponse, uploadImageEventResponse__Output as _imagespackage_uploadImageEventResponse__Output } from '../imagespackage/uploadImageEventResponse';

export interface filemanagementClient extends grpc.Client {
  downloadImageEvent(argument: _imagespackage_downloadImageEventPetition, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_imagespackage_downloadImageEventResponse__Output>): grpc.ClientUnaryCall;
  downloadImageEvent(argument: _imagespackage_downloadImageEventPetition, metadata: grpc.Metadata, callback: grpc.requestCallback<_imagespackage_downloadImageEventResponse__Output>): grpc.ClientUnaryCall;
  downloadImageEvent(argument: _imagespackage_downloadImageEventPetition, options: grpc.CallOptions, callback: grpc.requestCallback<_imagespackage_downloadImageEventResponse__Output>): grpc.ClientUnaryCall;
  downloadImageEvent(argument: _imagespackage_downloadImageEventPetition, callback: grpc.requestCallback<_imagespackage_downloadImageEventResponse__Output>): grpc.ClientUnaryCall;
  
  uploadImageEvent(argument: _imagespackage_uploadImageEventPetition, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_imagespackage_uploadImageEventResponse__Output>): grpc.ClientUnaryCall;
  uploadImageEvent(argument: _imagespackage_uploadImageEventPetition, metadata: grpc.Metadata, callback: grpc.requestCallback<_imagespackage_uploadImageEventResponse__Output>): grpc.ClientUnaryCall;
  uploadImageEvent(argument: _imagespackage_uploadImageEventPetition, options: grpc.CallOptions, callback: grpc.requestCallback<_imagespackage_uploadImageEventResponse__Output>): grpc.ClientUnaryCall;
  uploadImageEvent(argument: _imagespackage_uploadImageEventPetition, callback: grpc.requestCallback<_imagespackage_uploadImageEventResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface filemanagementHandlers extends grpc.UntypedServiceImplementation {
  downloadImageEvent: grpc.handleUnaryCall<_imagespackage_downloadImageEventPetition__Output, _imagespackage_downloadImageEventResponse>;
  
  uploadImageEvent: grpc.handleUnaryCall<_imagespackage_uploadImageEventPetition__Output, _imagespackage_uploadImageEventResponse>;
  
}

export interface filemanagementDefinition extends grpc.ServiceDefinition {
  downloadImageEvent: MethodDefinition<_imagespackage_downloadImageEventPetition, _imagespackage_downloadImageEventResponse, _imagespackage_downloadImageEventPetition__Output, _imagespackage_downloadImageEventResponse__Output>
  uploadImageEvent: MethodDefinition<_imagespackage_uploadImageEventPetition, _imagespackage_uploadImageEventResponse, _imagespackage_uploadImageEventPetition__Output, _imagespackage_uploadImageEventResponse__Output>
}
