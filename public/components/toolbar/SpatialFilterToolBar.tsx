/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { EuiFlexItem, EuiFlexGroup } from '@elastic/eui';
import { FilterByPolygon } from './FilterByPolygon';
import {DRAW_FILTER_MODES} from "../../../common/constants/shared";

interface SpatialFilterToolBarProps {
  setFilterProperties: (properties: DrawFilterProperties) => void;
}


export interface DrawFilterProperties {
  relation: string;
  mode: DRAW_FILTER_MODES;
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
