import React from 'react';
import { render } from 'react-dom';

import {
  AppExtensionSDK,
  SidebarExtensionSDK,
  init,
  locations,
} from '@contentful/app-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-tokens/dist/css/index.css';
import './index.css';

import Config from './components/ConfigScreen';
import Sidebar from './components/Sidebar';

init((sdk) => {
  const root = document.getElementById('root');

  // All possible locations for your app
  // Feel free to remove unused locations
  // Dont forget to delete the file too :)
  const ComponentLocationSettings = [
    {
      location: locations.LOCATION_APP_CONFIG,
      component: <Config sdk={sdk as AppExtensionSDK} />,
    },
    {
      location: locations.LOCATION_ENTRY_SIDEBAR,
      component: <Sidebar sdk={sdk as SidebarExtensionSDK} />,
    },
  ];

  // Select a component depending on a location in which the app is rendered.
  ComponentLocationSettings.forEach((componentLocationSetting) => {
    if (sdk.location.is(locations.LOCATION_ENTRY_SIDEBAR)) {
      (sdk as SidebarExtensionSDK).window.startAutoResizer();
    }

    if (sdk.location.is(componentLocationSetting.location)) {
      render(componentLocationSetting.component, root);
    }
  });
});