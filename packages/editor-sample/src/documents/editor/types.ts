/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEditorConfiguration } from './core';

export enum AllowedDataType {
  DataTypeBool = 'bool',
  DataTypeFilter = 'filter',
  DataTypeText = 'text',
  DataTypeList = 'list',
  DataTypeInt = 'int',
  DataTypeDecimal = 'decimal',
  DataTypeObject = 'object',
  DataTypeTimeStamp = 'timestamp',
  DataTypeDate = 'date',
  DataTypeTime = 'time',
  DataTypeURL = 'url',
  DataTypeJson = 'json',
  DataTypeObjectSlug = 'object_slug',
  DataTypeFieldSlug = 'field_slug',

  DataTypeRecord = 'record',

  DataTypeForm = 'form',
}

export interface AllowedData {
  type: AllowedDataType;
  data?: any;
}

export enum InputComponentType {
  Body = 'body',
  Select = 'select',
  HTML = 'html',
}

export enum GetValueType {
  JSON = 'JSON',
  HTML = 'HTML',
  TEXT = 'TEXT',
  ALL = 'ALL',
}

export interface InputType {
  allowed_data_types: AllowedData;
  selected_data?: any;
  allow_many?: boolean;
  title: string;
  description?: string;
  slug: string;
  component?: string;
}

export interface InputFieldData {
  object_slug: string;
  field_slug: string;
}

type VariableInputProps = {
  defaultValue: any;
  variant?: 'inline' | 'default' | 'nested';
  multiVariable?: boolean;
  placeholder: string;
  onSelect: (value: string) => void;
  handleChange: (value: any) => void;
  componentType?: InputComponentType;
  tiptapValueType: GetValueType;
  disabled?: boolean;
  allowedTypes: AllowedData;
  setEditor: React.Dispatch<any>;
  input?: InputType;
  inputFieldData?: InputFieldData;
  title?: string;
  className?: string;
};

// Types for external components
export interface ExternalComponents {
  VariableInput: React.ComponentType<VariableInputProps>;
}

export type TValue = {
  document: TEditorConfiguration;
  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'json' | 'html';
  selectedScreenSize: 'desktop' | 'mobile';
  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
};

// Props for the EditorProvider component
export interface EditorProviderProps {
  children: React.ReactNode;
  components: ExternalComponents;
}
