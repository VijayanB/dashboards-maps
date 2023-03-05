/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiPopover, EuiText } from '@elastic/eui';
import React, {Fragment, useEffect} from 'react';
import {Map as Maplibre} from 'maplibre-gl'

export const DrawFilterTooltip = (map : Maplibre) => {
  return <Fragment />;

  // useEffect(() => {
  //
  //   function onMouseMove()
  // }, [])
  //
  // const tooltipAnchor = (
  //   <div style={{ height: '26px', width: '26px', background: 'transparent' }} />
  // );
  //
  // return (
  //   <EuiPopover
  //     id="drawInstructionsTooltip"
  //     button={tooltipAnchor}
  //     anchorPosition="rightCenter"
  //     isOpen={true}
  //     closePopover={()=>{}}
  //     style={{
  //       pointerEvents: 'none',
  //       // transform: `translate(${this.state.x - 13}px, ${this.state.y - 13}px)`,
  //     }}
  //   >
  //     <EuiText color="subdued" size="xs">
  //       {'start drawing'}
  //     </EuiText>
  //   </EuiPopover>
  // );
};
