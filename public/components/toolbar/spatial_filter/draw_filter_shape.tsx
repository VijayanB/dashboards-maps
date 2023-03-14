/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment, useEffect, useRef } from 'react';
import { IControl, Map as Maplibre } from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Feature } from 'geojson';
import { DrawFilterProperties, FILTER_DRAW_MODE} from '../../../../common';
import { DrawRectangle } from '../../draw/modes/rectangle';

const additionalDrawMode = {
  DRAW_RECTANGLE: 'draw_rectangle',
};

interface DrawFilterShapeProps {
  mode: FILTER_DRAW_MODE;
  map: Maplibre;
  updateFilterProperties: (properties: DrawFilterProperties) => void;
  addFeatures: (features: Feature[]) => void;
}
export const DrawFilterShape = ({ mode, map, updateFilterProperties, addFeatures }: DrawFilterShapeProps) => {
  const onDraw = (e: { features: Feature[] }) => {
    addFeatures(e.features);
    updateFilterProperties({
      mode: FILTER_DRAW_MODE.NONE,
    });
  };
  const mapboxDrawRef = useRef<MapboxDraw>(
    new MapboxDraw({
      modes: {
        ...MapboxDraw.modes,
        [additionalDrawMode.DRAW_RECTANGLE]: DrawRectangle,
      },
      displayControlsDefault: false,
    })
  );

  useEffect(() => {
    if (map) {
      map.addControl((mapboxDrawRef.current as unknown) as IControl);
      map.on('draw.create', onDraw);
    }
    return () => {
      if (map) {
        map.off('draw.create', onDraw);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        map.removeControl((mapboxDrawRef.current as unknown) as IControl);
      }
    };
  }, []);

  useEffect(() => {
    if (mode === FILTER_DRAW_MODE.POLYGON) {
      mapboxDrawRef.current.changeMode('draw_polygon');
    } else if (mode === FILTER_DRAW_MODE.BOUNDS) {
      mapboxDrawRef.current.changeMode('draw_rectangle');
    } else {
      mapboxDrawRef.current.changeMode('simple_select');
    }
  }, [mode]);

  return <Fragment />;
};
