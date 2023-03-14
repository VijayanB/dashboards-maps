/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Query, TimeRange } from '../../../../src/plugins/data/common';
import { GeoSpatialFilter } from '../../common';
import {Feature} from "geojson";

export interface MapState {
  timeRange: TimeRange;
  query: Query;
  geoSpatialFilters: Feature[];
  refreshInterval: {
    pause: boolean;
    value: number;
  };
}
