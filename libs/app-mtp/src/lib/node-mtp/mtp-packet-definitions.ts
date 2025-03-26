/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ContainerTypeCode {
  Undefined = 0x0000,
  Command = 0x0001,
  Data = 0x0002,
  Response = 0x0003,
  Event = 0x0004,
}

export const containerTypeNames: Record<ContainerTypeCode, string> = {
  [ContainerTypeCode.Undefined]: "Undefined",
  [ContainerTypeCode.Command]: "Command",
  [ContainerTypeCode.Data]: "Data",
  [ContainerTypeCode.Response]: "Response",
  [ContainerTypeCode.Event]: "Event",
}

export enum ContainerCode {
  OpenSession = 0x1002,
  CloseSession = 0x1003,
  GetObjectHandles = 0x1007,
  GetObject = 0x1009,
  GetObjectPropValue = 0x9803,
  ObjectFileName = 0xdc07,
  ObjectFileSize = 0xdc04,
  ObjectFileType = 0xdc02,
  SendObjectInfo = 0x100c,
  SendObject = 0x100d,

  // STATUS
  StatusOk = 0x2001,
  GeneralError = 0x2002,
  SessionNotOpen = 0x2003,
  InvalidTransactionId = 0x2004,
  OperationNotSupported = 0x2005,
  ParameterNotSupported = 0x2006,
  IncompleteTransfer = 0x2007,
  InvalidStorageId = 0x2008,
  InvalidObjectHandle = 0x2009,
  DevicePropNotSupported = 0x200a,
  InvalidObjectFormatCode = 0x200b,
  StoreFull = 0x200c,
  ObjectWriteProtected = 0x200d,
  StoreReadOnly = 0x200e,
  AccessDenied = 0x200f,
  NoThumbnailPresent = 0x2010,
  SelfTestFailed = 0x2011,
  PartialDeletion = 0x2012,
  StoreNotAvailable = 0x2013,
  SpecificationByFormatUnsupported = 0x2014,
  NoValidObjectInfo = 0x2015,
  InvalidCodeFormat = 0x2016,
  UnknownVendorCode = 0x2017,
  CaptureAlreadyTerminated = 0x2018,
  DeviceBusy = 0x2019,
  InvalidParentObject = 0x201a,
  InvalidDevicePropFormat = 0x201b,
  InvalidDevicePropValue = 0x201c,
  InvalidParameter = 0x201d,
  SessionAlreadyOpen = 0x201e,
  TransactionCancelled = 0x201f,
  SpecificationOfDestinationUnsupported = 0x2020,
  InvalidObjectPropCode = 0xa801,
  InvalidObjectPropFormat = 0xa802,
  InvalidObjectPropValue = 0xa803,
  InvalidObjectReference = 0xa804,
  GroupNotSupported = 0xa805,
  InvalidDataset = 0xa806,
  SpecificationByGroupUnsupported = 0xa807,
  SpecificationByDepthUnsupported = 0xa808,
  ObjectTooLarge = 0xa809,
  ObjectPropNotSupported = 0xa80a,
}

export const containerCodeNames: Record<ContainerCode, string> = {
  [ContainerCode.OpenSession]: "OpenSession",
  [ContainerCode.CloseSession]: "CloseSession",
  [ContainerCode.GetObjectHandles]: "GetObjectHandles",
  [ContainerCode.GetObject]: "GetObject",
  [ContainerCode.GetObjectPropValue]: "GetObjectPropValue",
  [ContainerCode.ObjectFileName]: "Object file name",
  [ContainerCode.ObjectFileSize]: "Object file size",
  [ContainerCode.ObjectFileType]: "Object file type",
  [ContainerCode.SendObjectInfo]: "SendObjectInfo",
  [ContainerCode.SendObject]: "SendObject",

  // STATUS
  [ContainerCode.StatusOk]: "OK",
  [ContainerCode.GeneralError]: "General Error",
  [ContainerCode.SessionNotOpen]: "Session Not Open",
  [ContainerCode.InvalidTransactionId]: "Invalid Transaction ID",
  [ContainerCode.OperationNotSupported]: "Operation Not Supported",
  [ContainerCode.ParameterNotSupported]: "Parameter Not Supported",
  [ContainerCode.IncompleteTransfer]: "Incomplete Transfer",
  [ContainerCode.InvalidStorageId]: "Invalid Storage ID",
  [ContainerCode.InvalidObjectHandle]: "Invalid Object Handle",
  [ContainerCode.DevicePropNotSupported]: "DeviceProp Not Supported",
  [ContainerCode.InvalidObjectFormatCode]: "Invalid Object Format Code",
  [ContainerCode.StoreFull]: "Store Full",
  [ContainerCode.ObjectWriteProtected]: "Object Write Protected",
  [ContainerCode.StoreReadOnly]: "Store Read Only",
  [ContainerCode.AccessDenied]: "Access Denied",
  [ContainerCode.NoThumbnailPresent]: "No Thumbnail Present",
  [ContainerCode.SelfTestFailed]: "Self Test Failed",
  [ContainerCode.PartialDeletion]: "Partial Deletion",
  [ContainerCode.StoreNotAvailable]: "Store Not Available",
  [ContainerCode.SpecificationByFormatUnsupported]:
    "Specification By Format Unsupported",
  [ContainerCode.NoValidObjectInfo]: "No Valid Object Info",
  [ContainerCode.InvalidCodeFormat]: "Invalid Code Format",
  [ContainerCode.UnknownVendorCode]: "Unknown Vendor Code",
  [ContainerCode.CaptureAlreadyTerminated]: "Capture Already Terminated",
  [ContainerCode.DeviceBusy]: "Device Busy",
  [ContainerCode.InvalidParentObject]: "Invalid Parent Object",
  [ContainerCode.InvalidDevicePropFormat]: "Invalid DeviceProp Format",
  [ContainerCode.InvalidDevicePropValue]: "Invalid DeviceProp Value",
  [ContainerCode.InvalidParameter]: "Invalid Parameter",
  [ContainerCode.SessionAlreadyOpen]: "Session Already Open",
  [ContainerCode.TransactionCancelled]: "Transaction Cancelled",
  [ContainerCode.SpecificationOfDestinationUnsupported]:
    "Specification of Destination Unsupported",
  [ContainerCode.InvalidObjectPropCode]: "Invalid Object Prop Code",
  [ContainerCode.InvalidObjectPropFormat]: "Invalid Object Prop Format",
  [ContainerCode.InvalidObjectPropValue]: "Invalid Object Prop Value",
  [ContainerCode.InvalidObjectReference]: "Invalid Object Reference",
  [ContainerCode.GroupNotSupported]: "Group Not Supported",
  [ContainerCode.InvalidDataset]: "Invalid Dataset",
  [ContainerCode.SpecificationByGroupUnsupported]:
    "Specification By Group Unsupported",
  [ContainerCode.SpecificationByDepthUnsupported]:
    "Specification By Depth Unsupported",
  [ContainerCode.ObjectTooLarge]: "Object Too Large",
  [ContainerCode.ObjectPropNotSupported]: "Object Prop Not Supported",
}

const rootObjectHandle = 0xffffffff
const allStorage = 0xffffffff

const undefinedObjectFormat = 0x3000
