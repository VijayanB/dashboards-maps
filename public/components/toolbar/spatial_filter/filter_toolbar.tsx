/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem} from '@elastic/eui';
import {FilterByPolygon} from './filter_by_polygon';
import {DrawFilterProperties, FILTER_DRAW_MODE} from '../../../../common';
import {FilterByRectangle} from './filter_by_rectangle';

interface SpatialFilterToolBarProps {
  setFilterProperties: (properties: DrawFilterProperties) => void;
  mode: FILTER_DRAW_MODE;
}

export const SpatialFilterToolbar = ({ setFilterProperties, mode }: SpatialFilterToolBarProps) => {
  const isDrawActive: boolean = mode !== FILTER_DRAW_MODE.NONE;
  const filterIconGroups = (
    <EuiFlexItem>
      <FilterByPolygon
        setDrawFilterProperties={setFilterProperties}
        isDrawActive={isDrawActive}
        mode={mode}
      />
      <FilterByRectangle
        setDrawFilterProperties={setFilterProperties}
        isDrawActive={isDrawActive}
        mode={mode}
      />
    </EuiFlexItem>
  );

  // if (isDrawActive) {
  //   return (
  //     <EuiFlexGroup gutterSize="s">
  //       <EuiFlexItem grow={false}>
  //         <EuiButton fill size="s" onClick={onCancel}>
  //           {'Cancel'}
  //         </EuiButton>
  //       </EuiFlexItem>
  //       {filterIconGroups}
  //     </EuiFlexGroup>
  //   );
  // }
  return (
    <EuiFlexGroup responsive={false} direction="column" alignItems="flexStart" gutterSize="s">
      {filterIconGroups}
    </EuiFlexGroup>
  );
};
