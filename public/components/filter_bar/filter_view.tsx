/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiFlexGroup, EuiFlexItem, EuiBadge} from '@elastic/eui';
import React, { Fragment } from 'react';
import { GeoShapeFilterMeta } from '../../../../../src/plugins/data/common';

interface SpatialFilterProps {
  filterMeta?: GeoShapeFilterMeta[];
}

function renderItems(filterMeta?: GeoShapeFilterMeta[]) {
  return filterMeta?.map((filter, i) => (
    <EuiFlexItem className="globalFilterBar__flexItem" grow={false} style={{ margin: '2px' }}>
      <EuiBadge
        iconType="cross"
        iconSide="right"
        onClick={() => window.alert('Badge clicked')}
        onClickAriaLabel="Example of onClick event for the button"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample3"
      >
        {filter.alias}
      </EuiBadge>
    </EuiFlexItem>
  ));
}

export const FilterView = ({ filterMeta }: SpatialFilterProps) => {
  if (!!filterMeta?.length) {
    return (
      <Fragment>
        <EuiFlexGroup
          wrap={true}
          responsive={false}
          gutterSize="xs"
          tabIndex={-1}
          style={{ padding: '10px', paddingBottom: '2px' }}
        >
          {renderItems(filterMeta)}
        </EuiFlexGroup>
      </Fragment>
    );
  }
  return null;
};
