/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useRef } from 'react';
import { IControl, Map as Maplibre } from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { DrawFilterProperties } from '../toolbar/SpatialFilterToolBar';
import { DrawFilterTooltip } from './draw_filter_tooltip';
import { DRAW_FILTER_MODES } from '../../../common/constants/shared';

interface DrawFilterProps {
  map: Maplibre;
  filterProperties: DrawFilterProperties;
}

export const DrawFilter = ({ map, filterProperties }: DrawFilterProps) => {
  const mapBoxDraw = useRef<MapboxDraw>(
    new MapboxDraw({
      displayControlsDefault: false,
    })
  );
  useEffect(() => {
    // add mapbox draw control only once
    map.addControl((mapBoxDraw as unknown) as IControl);
  }, []);

  useEffect(() => {
    if (filterProperties.mode === DRAW_FILTER_MODES.POLYGON) {
      mapBoxDraw.current.changeMode('draw_polygon');
    } else {
      mapBoxDraw.current.changeMode('simple_select');
    }
  }, [filterProperties]);

  return <DrawFilterTooltip />;
};
