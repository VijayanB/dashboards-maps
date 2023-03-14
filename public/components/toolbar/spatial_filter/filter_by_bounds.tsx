/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EuiPopover, EuiContextMenu, EuiPanel, EuiButtonIcon } from '@elastic/eui';
import { FilterInputPanel } from './filter_input_panel';
import bounds from '../../../images/polygon.svg';
import {
  DrawFilterProperties,
  DRAW_FILTER_BOUNDS,
  DRAW_FILTER_SHAPE_RELATIONS,
  DRAW_FILTER_SHAPE_TITLE,
  DRAW_FILTER_BOUNDS_DEFAULT_LABEL,
} from '../../../../common';
import { FILTER_DRAW_MODE } from '../../../../common';

interface FilterByBoundsProps {
  setDrawFilterProperties: (properties: DrawFilterProperties) => void;
  isDrawActive: boolean;
}

export const FilterByBounds = ({ setDrawFilterProperties, isDrawActive }: FilterByBoundsProps) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
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
          drawLabel={DRAW_FILTER_BOUNDS}
          defaultFilterLabel={DRAW_FILTER_BOUNDS_DEFAULT_LABEL}
          relations={DRAW_FILTER_SHAPE_RELATIONS}
          onSubmit={onSubmit}
          mode={FILTER_DRAW_MODE.BOUNDS}
        />
      ),
    },
  ];

  const drawBoundsButton = (
    <EuiPanel paddingSize="none" className="spatialFilterToolbar__shape">
      <EuiButtonIcon
        color="text"
        size={'s'}
        iconType={bounds}
        onClick={onClick}
        aria-label={'draw_filter_bounds'}
        title={DRAW_FILTER_BOUNDS}
        isDisabled={isDrawActive}
      />
    </EuiPanel>
  );
  return (
    <EuiPopover
      id="drawBoundsId"
      button={drawBoundsButton}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="leftUp"
      data-test-subj="drawBoundsPopOver"
    >
      <EuiContextMenu initialPanelId={0} panels={panels} />
    </EuiPopover>
  );
};
