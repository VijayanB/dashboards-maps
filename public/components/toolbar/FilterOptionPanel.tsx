import React, { ChangeEvent, useState } from 'react';
import { EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiPanel, EuiSelect } from '@elastic/eui';

const getSpatialRelationshipItems = (
  relations: string[]
): Array<{ value: string; text: string }> => {
  return relations.map((relation) => {
    return {
      value: relation,
      text: relation,
    };
  });
};

export interface FilterOptionPanelProps {
  drawLabel: string;
  initialLabel: string;
  readonly relations: string[];
  onSubmit: ({ relation, label }: { relation: string; label: string }) => void;
}

export const FilterOptionPanel = ({
  drawLabel,
  initialLabel,
  relations,
  onSubmit,
}: FilterOptionPanelProps) => {
  const [label, setLabel] = useState<string>(initialLabel);
  const [spatialRelation, setSpatialRelation] = useState<string>(relations[0]);

  const onSpatialRelationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSpatialRelation(event.target.value);
  };

  const onDraw = () => {
    onSubmit({
      relation: spatialRelation,
      label,
    });
  };

  return (
    <EuiPanel style={{ maxWidth: 300, border: 'hidden' }}>
      <EuiForm>
        <EuiFormRow label="Filter label" display="rowCompressed">
          <EuiFieldText
            name="filterLabel"
            value={label}
            onChange={(event) => {
              setLabel(event.target.value);
            }}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="Spatial relation" display="rowCompressed">
          <EuiSelect
            options={getSpatialRelationshipItems(relations)}
            onChange={onSpatialRelationChange}
            value={spatialRelation}
            compressed
          />
        </EuiFormRow>
        <EuiFormRow display="rowCompressed">
          <EuiButton
            fullWidth
            size="s"
            fill
            aria-label={drawLabel}
            data-test-subj="add-draw-button"
            onClick={onDraw}
          >
            {drawLabel}
          </EuiButton>
        </EuiFormRow>
      </EuiForm>
    </EuiPanel>
  );
};
