import React, { useState } from 'react';

import { ToggleButton } from '@mui/material';
import { HeadingProps, HeadingPropsDefaults, HeadingPropsSchema } from '@usewaypoint/block-heading';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
import { useExternalComponents } from '../../../ExternalComponentsContext';
import { AllowedDataType, GetValueType } from '../../../../documents/editor/types';

type HeadingSidebarPanelProps = {
  data: HeadingProps;
  setData: (v: HeadingProps) => void;
};
export default function HeadingSidebarPanel({ data, setData }: HeadingSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const [, setEditor] = useState(null);

  const { VariableInput } = useExternalComponents();

  const updateData = (d: unknown) => {
    const res = HeadingPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const handleTextChange = (text: string) => {
    updateData({ ...data, props: { ...data.props, text } });
  };

  const handleVariableSelect = (variable: string) => {
    const currentText = data.props?.text ?? HeadingPropsDefaults.text;
    const newText = currentText + variable;
    handleTextChange(newText);
  };

  return (
    <BaseSidebarPanel title="Heading block">
      {VariableInput ? (
        <VariableInput
          defaultValue={data.props?.text ?? HeadingPropsDefaults.text}
          placeholder="Enter heading text"
          handleChange={handleTextChange}
          onSelect={handleVariableSelect}
          setEditor={setEditor}
          multiVariable={true}
          variant="default"
          tiptapValueType={GetValueType.ALL}
          allowedTypes={{
            type: AllowedDataType.DataTypeText,
          }}
        />
      ) : (
        <TextInput
          label="Content"
          rows={3}
          defaultValue={data.props?.text ?? HeadingPropsDefaults.text}
          onChange={(text) => {
            updateData({ ...data, props: { ...data.props, text } });
          }}
        />
      )}
      <RadioGroupInput
        label="Level"
        defaultValue={data.props?.level ?? HeadingPropsDefaults.level}
        onChange={(level) => {
          updateData({ ...data, props: { ...data.props, level } });
        }}
      >
        <ToggleButton value="h1">H1</ToggleButton>
        <ToggleButton value="h2">H2</ToggleButton>
        <ToggleButton value="h3">H3</ToggleButton>
      </RadioGroupInput>
      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
