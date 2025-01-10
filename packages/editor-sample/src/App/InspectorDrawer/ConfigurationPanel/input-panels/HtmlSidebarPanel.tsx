import React, { useState } from 'react';

import { HtmlProps, HtmlPropsSchema } from '@usewaypoint/block-html';

import { AllowedDataType, GetValueType } from '../../../../documents/editor/types';
import { useExternalComponents } from '../../../ExternalComponentsContext';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type HtmlSidebarPanelProps = {
  data: HtmlProps;
  setData: (v: HtmlProps) => void;
};
export default function HtmlSidebarPanel({ data, setData }: HtmlSidebarPanelProps) {
  const { VariableInput } = useExternalComponents();

  console.log(VariableInput);

  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const [, setEditor] = useState(null);

  const updateData = (d: unknown) => {
    const res = HtmlPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const handleContentChange = (contents: string) => {
    updateData({ ...data, props: { ...data.props, contents } });
  };

  const handleVariableSelect = (variable: string) => {
    const currentContent = data.props?.contents ?? '';
    const newContent = currentContent + variable;
    handleContentChange(newContent);
  };

  return (
    <BaseSidebarPanel title="Html block">
      {VariableInput ? (
        <VariableInput
          defaultValue={data.props?.contents ?? ''}
          placeholder="Enter HTML content"
          handleChange={handleContentChange}
          onSelect={handleVariableSelect}
          setEditor={setEditor}
          multiVariable={true}
          variant="default"
          tiptapValueType={GetValueType.ALL}
          allowedTypes={{
            type: AllowedDataType.DataTypeBool,
          }}
        />
      ) : (
        <TextInput
          label="Content"
          rows={5}
          defaultValue={data.props?.contents ?? ''}
          onChange={(contents) => updateData({ ...data, props: { ...data.props, contents } })}
        />
      )}

      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
