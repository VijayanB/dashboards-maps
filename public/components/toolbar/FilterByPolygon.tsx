/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { EuiPopover, EuiContextMenu, EuiPanel, EuiButtonIcon } from '@elastic/eui';
import { FilterOptionPanel } from './FilterOptionPanel';
import polygon from '../../images/polygon.svg';
import {
  DRAW_FILTER_POLYGON, DRAW_FILTER_POLYGON_DEFAULT_LABEL,
  DRAW_FILTER_POLYGON_RELATIONS,
  DRAW_FILTER_SHAPE_TITLE
} from '../../../common/constants/shared';
import { DrawFilterProperties } from './SpatialFilterToolBar';

interface FilterByPolygonProps {
  setDrawFilterProperties: (properties: DrawFilterProperties) => void;
}

export const FilterByPolygon = ({ setDrawFilterProperties }: FilterByPolygonProps) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onSubmit = (input: { relation: string; label: string }) => {
    setDrawFilterProperties({
      mode: 'Polygon',
      relation: input.relation,
      label: input.label,
    });
    closePopover();
  };

  const panels = [
    {
      id: 0,
      title: DRAW_FILTER_SHAPE_TITLE,
      content: (
        <FilterOptionPanel
          drawLabel={DRAW_FILTER_POLYGON}
          initialLabel={DRAW_FILTER_POLYGON_DEFAULT_LABEL}
          relations={DRAW_FILTER_POLYGON_RELATIONS}
          onSubmit={onSubmit}
        />
      ),
    },
  ];

  const button = (
    <EuiPanel paddingSize="none" className="spatialFilterToolbar__button">
      <EuiButtonIcon
        color="text"
        size={'s'}
        iconType={polygon}
        onClick={onButtonClick}
        aria-label={'draw_filter_polygon'}
        title={DRAW_FILTER_POLYGON}
      />
    </EuiPanel>
  );
  return (
    <EuiPopover
      id="id"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="leftUp"
      data-test-subj="mapToolsControlPopover"
    >
      <EuiContextMenu initialPanelId={0} panels={panels} />
    </EuiPopover>
  );
};
