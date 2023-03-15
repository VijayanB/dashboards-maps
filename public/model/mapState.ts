import { Query, TimeRange } from '../../../../src/plugins/data/common';
import { GeoShapeFilter } from './geo/filter';

export interface MapState {
  timeRange: TimeRange;
  query: Query;
  refreshInterval: {
    pause: boolean;
    value: number;
  };
  spatialFilters: GeoShapeFilter[];
}
