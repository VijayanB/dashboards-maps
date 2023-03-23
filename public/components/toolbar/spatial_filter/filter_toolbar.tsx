/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { FilterByPolygon } from './filter_by_polygon';
import { DrawFilterProperties, FILTER_DRAW_MODE } from '../../../../common';
import { FilterByRectangle } from './filter_by_rectangle';

interface SpatialFilterToolBarProps {
  setFilterProperties: (properties: DrawFilterProperties) => void;
  mode: FILTER_DRAW_MODE;
}

export const SpatialFilterToolbar = ({ setFilterProperties, mode }: SpatialFilterToolBarProps) => {
  const isDrawActive: boolean = mode !== FILTER_DRAW_MODE.NONE;
  const onCancel = () => {
    setFilterProperties({
      mode: FILTER_DRAW_MODE.NONE,
    });
  };

  const filterIconGroups = (
    <EuiFlexGroup responsive={false} direction="column" alignItems="flexStart" gutterSize="none">
      <EuiFlexItem>
        <FilterByPolygon
          setDrawFilterProperties={setFilterProperties}
          isDrawActive={isDrawActive}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <FilterByRectangle
          setDrawFilterProperties={setFilterProperties}
          isDrawActive={isDrawActive}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const cancelDraw = (
    <EuiFlexGroup direction={'column'} gutterSize="s">
      <EuiFlexItem grow={false}>
        <EuiButton fill size="s" onClick={onCancel}>
          {'Cancel'}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
  return (
    <EuiFlexGroup responsive={false} direction="row" alignItems="flexStart" gutterSize="s">
      {isDrawActive ? cancelDraw : filterIconGroups}
    </EuiFlexGroup>
  );
};
