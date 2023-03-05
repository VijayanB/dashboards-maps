/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { EuiFlexItem, EuiFlexGroup } from '@elastic/eui';
import { FilterByPolygon } from './FilterByPolygon';

interface SpatialFilterToolBarProps {
  setFilterProperties: (properties: DrawFilterProperties) => void;
}

export type FilterModes = 'Polygon' | 'Rectangle';

export interface DrawFilterProperties {
  relation: string;
  mode: FilterModes;
  label: string;
}

export const SpatialFilterToolBar = ({ setFilterProperties }: SpatialFilterToolBarProps) => {
  return (
    <EuiFlexGroup responsive={false} direction="column" alignItems="flexStart" gutterSize="s">
      <EuiFlexItem>
        <FilterByPolygon setDrawFilterProperties={setFilterProperties} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
