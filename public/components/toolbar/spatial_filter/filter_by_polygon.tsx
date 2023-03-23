/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EuiPopover, EuiContextMenu, EuiPanel, EuiButtonIcon, EuiButton } from '@elastic/eui';
import { FilterInputPanel } from './filter_input_panel';
import polygon from '../../../images/polygon.svg';
import {
  DrawFilterProperties,
  DRAW_FILTER_POLYGON,
  DRAW_FILTER_POLYGON_DEFAULT_LABEL,
  DRAW_FILTER_SPATIAL_RELATIONS,
  DRAW_FILTER_SHAPE_TITLE,
} from '../../../../common';
import { FILTER_DRAW_MODE } from '../../../../common';

interface FilterByPolygonProps {
  setDrawFilterProperties: (properties: DrawFilterProperties) => void;
  isDrawActive: boolean;
  mode: FILTER_DRAW_MODE;
}

export const FilterByPolygon = ({
  setDrawFilterProperties,
  isDrawActive,
  mode,
}: FilterByPolygonProps) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onCancel = () => {
    setDrawFilterProperties({
      mode: FILTER_DRAW_MODE.NONE,
    });
    closePopover();
  };

  const onSubmit = (input: { relation: string; label: string; mode: FILTER_DRAW_MODE }) => {
    setDrawFilterProperties({
      mode: input.mode,
      relation: input.relation,
      filterLabel: input.label,
    });
    closePopover();
  };

  const panels = [
    {
      id: 0,
      title: DRAW_FILTER_SHAPE_TITLE,
      content: (
        <FilterInputPanel
          drawLabel={DRAW_FILTER_POLYGON}
          defaultFilterLabel={DRAW_FILTER_POLYGON_DEFAULT_LABEL}
          relations={DRAW_FILTER_SPATIAL_RELATIONS}
          onSubmit={onSubmit}
          mode={FILTER_DRAW_MODE.POLYGON}
        />
      ),
    },
  ];

  const drawPolygonButton = (
    <EuiPanel paddingSize="none" className="spatialFilterToolbar__shape">
      <EuiButtonIcon
        color="text"
        size={'s'}
        iconType={polygon}
        onClick={onClick}
        aria-label={'draw_filter_polygon'}
        title={DRAW_FILTER_POLYGON}
        isDisabled={isDrawActive}
      />
      {isDrawActive && mode === FILTER_DRAW_MODE.POLYGON && (
        <EuiButton
          fill
          size="s"
          onClick={onCancel}
          style={{ position: 'absolute', transform: 'translateX(calc(-100% - 20px))', left: 0 }}
        >
          {'Cancel'}
        </EuiButton>
      )}
    </EuiPanel>
  );
  return (
    <EuiPopover
      id="drawPolygonId"
      button={drawPolygonButton}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="leftUp"
      data-test-subj="drawPolygonPopOver"
    >
      <EuiContextMenu initialPanelId={0} panels={panels} />
    </EuiPopover>
  );
};
