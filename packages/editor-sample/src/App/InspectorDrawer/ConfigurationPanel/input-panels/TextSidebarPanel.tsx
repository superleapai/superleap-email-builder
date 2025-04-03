import React, { useState } from 'react';

import { TextProps, TextPropsSchema } from '@usewaypoint/block-text';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
import { useExternalComponents } from '../../../ExternalComponentsContext';
import { AllowedDataType, GetValueType } from '../../../../documents/editor/types';

type TextSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};
export default function TextSidebarPanel({ data, setData }: TextSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const [, setEditor] = useState(null);

  const { VariableInput } = useExternalComponents();

  const updateData = (d: unknown) => {
    const res = TextPropsSchema.safeParse(d);
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
    const currentText = data.props?.text ?? '';
    const newText = currentText + variable;
    handleTextChange(newText);
  };

  return (
    <BaseSidebarPanel title="Text block">
      {VariableInput ? (
        <VariableInput
          defaultValue={data.props?.text ?? ''}
          placeholder="Enter text content"
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
          rows={5}
          defaultValue={data.props?.text ?? ''}
          onChange={(text) => updateData({ ...data, props: { ...data.props, text } })}
        />
      )}
      <BooleanInput
        label="Markdown"
        defaultValue={data.props?.markdown ?? false}
        onChange={(markdown) => updateData({ ...data, props: { ...data.props, markdown } })}
      />

      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
