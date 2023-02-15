/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import MapboxDraw, { DrawCustomMode, DrawLineString } from '@mapbox/mapbox-gl-draw';
import circle from '@turf/circle';
import length from '@turf/length';
import { Feature, GeoJSON, Geometry, LineString, Position } from 'geojson';
import { Polygon } from '@turf/helpers';

// converted to typescript from here: https://github.com/mapbox/geojson.io/blob/main/src/ui/draw/circle.js

interface DrawCircleState extends DrawLineString {
  currentVertexPosition: number;
  direction: string;
}

const isFeature = (geoJSON: GeoJSON): geoJSON is Feature => geoJSON.type === 'Feature';
const isLineString = (g: Geometry): g is LineString => g.type === 'LineString';

function circleFromTwoVertexLineString(geoJSON: GeoJSON): Feature<Polygon, {}> | undefined {
  if (!isFeature(geoJSON)) {
    return;
  }
  if (!isLineString(geoJSON.geometry)) {
    return;
  }
  const center: Position = (geoJSON.geometry as LineString).coordinates[0];
  const radiusInKm: number = length(geoJSON);
  return circle(center, radiusInKm);
}

interface Measurements {
  metric: string;
  standard: string;
}

function getDisplayMeasurements(feature: Feature): Measurements {
  // should log both metric and standard display strings for the current drawn feature

  // metric calculation
  const drawnLength = length(feature) * 1000; // meters

  let metricUnits = 'm';
  let metricFormat = '0,0';
  let metricMeasurement;

  let standardUnits = 'ft';
  let standardFormat = '0,0';
  let standardMeasurement;

  metricMeasurement = drawnLength;
  if (drawnLength >= 1000) {
    // if over 1000 meters, upgrade metric
    metricMeasurement = drawnLength / 1000;
    metricUnits = 'km';
    metricFormat = '0.00';
  }

  standardMeasurement = drawnLength * 3.28084;
  if (standardMeasurement >= 5280) {
    // if over 5280 feet, upgrade standard
    standardMeasurement /= 5280;
    standardUnits = 'mi';
    standardFormat = '0.00';
  }
  return {
    metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(standardFormat)} ${standardUnits}`,
  };
}

export const CircleMode: DrawCustomMode = {
  ...MapboxDraw.modes.draw_line_string,
  onClick(state: DrawCircleState, e: MapboxDraw.MapMouseEvent) {
    // this ends the drawing after the user creates a second point, triggering this.onStop
    if (state.currentVertexPosition === 1) {
      state.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
      return this.changeMode('simple_select', { featureIds: [state.id] });
    }

    state.updateCoordinate(String(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);
    if (state.direction === 'forward') {
      state.currentVertexPosition += 1;
      state.updateCoordinate(String(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);
    } else {
      state.addCoordinate(String(0), e.lngLat.lng, e.lngLat.lat);
    }
    return null;
  },

  onStop(state: DrawCircleState) {
    // remove last added coordinate
    state.removeCoordinate('0');
    if (state.isValid()) {
      const lineGeoJson: GeoJSON = state.toGeoJSON();
      const circleFeature: Feature<Polygon, {}> | undefined = circleFromTwoVertexLineString(
        lineGeoJson
      );
      if (!circleFeature) {
        return;
      }

      this.map.fire('draw.create', {
        features: [circleFeature],
      });
    } else {
      // @ts-ignore
      this.deleteFeature([state.id], { silent: true });
      this.changeMode('simple_select', {}, { silent: true });
    }
  },

  toDisplayFeatures(state: DrawCircleState, geojson: GeoJSON, display: (geojson: GeoJSON) => void) {
    if (!isFeature(geojson)) {
      return null;
    }

    const feature: Feature = geojson;

    if (!isLineString(feature.geometry)) {
      return null;
    }

    const lineString: LineString = feature.geometry;

    // Only render the line if it has at least one real coordinate
    if (lineString.coordinates.length < 2) return null;

    display({
      type: 'Feature',
      properties: {
        active: 'true',
      },
      geometry: {
        type: 'Point',
        coordinates: lineString.coordinates[0],
      },
    });

    // displays the line as it is drawn
    feature.properties!.active = 'true';
    display(feature);

    const displayMeasurements: Measurements = getDisplayMeasurements(feature);

    // create custom feature for the current pointer position
    const currentVertex: GeoJSON = {
      type: 'Feature',
      properties: {
        meta: 'currentPosition',
        radius: `${displayMeasurements.metric} ${displayMeasurements.standard}`,
        parent: state.id,
      },
      geometry: {
        type: 'Point',
        coordinates: lineString.coordinates[1],
      },
    };

    display(currentVertex);

    const circleFeature: Feature<Polygon, {}> | undefined = circleFromTwoVertexLineString(geojson);

    if (!circleFeature) {
      return null;
    }
    circleFeature.properties = {
      active: 'true',
    };
    display(circleFeature);
  },
};
