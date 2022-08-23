/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { i18n } from '@osd/i18n';
import { 
  AppMountParameters,
  CoreSetup,
  CoreStart,
  DEFAULT_APP_CATEGORIES,
  Plugin 
} from '../../../src/core/public';
import {
  MapsDashboardsPluginSetup,
  MapsDashboardsPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class MapsDashboardsPlugin
  implements Plugin<MapsDashboardsPluginSetup, MapsDashboardsPluginStart> {
  public setup(core: CoreSetup): MapsDashboardsPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'mapsDashboards',
      title: PLUGIN_NAME,
      category: DEFAULT_APP_CATEGORIES.opensearchDashboards,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('mapsDashboards.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): MapsDashboardsPluginStart {
    return {};
  }

  public stop() {}
}