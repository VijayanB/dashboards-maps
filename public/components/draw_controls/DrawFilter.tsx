/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { IControl, Map as Maplibre } from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { DrawFilterProperties } from '../toolbar/SpatialFilterToolBar';
import { DrawFilterTooltip } from './draw_filter_tooltip';

interface DrawFilterProps {
  map: Maplibre;
  filterProperties: DrawFilterProperties;
}

export const DrawFilter = ({ map, filterProperties }: DrawFilterProps) => {
  const mapboxDraw: MapboxDraw = new MapboxDraw({
    displayControlsDefault: false,
  });
  map.addControl((mapboxDraw as unknown) as IControl);
  mapboxDraw.changeMode('draw_polygon');
  return <DrawFilterTooltip />;
};
