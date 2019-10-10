// import * as React from 'react';
import _ from 'lodash';

import { IScriptManager, WebShareConfig } from './types';

export default class ScriptManager implements IScriptManager {
  private components: object;

  private instance: any;

  private loaded: boolean;

  constructor() {
    this.loaded = false;
    this.components = {};

    this.instance = undefined;
    this.createScriptTag('https://www.yoti.com/share/client/');

    // Due to the nature of React and the Share library both trying to
    // control the DOM, we need a small debounce if multiple buttons
    // are initialized at the same time.
    this.updateComponents = _.debounce(this.updateComponents);
  }

  registerComponent = (id: string, config: WebShareConfig) => {
    this.components[id] = { ...config };
    this.updateComponents();
  };

  deregisterComponent = (id: string) => {
    delete this.components[id];
    this.updateComponents();
  };

  protected updateComponents = () => {
    if (this.loaded) {
      const ids = Object.keys(this.components);
      if (ids.length > 0) {
        const config = ids.map(id => this.components[id]);
        console.log(config);

        if (this.instance) {
          this.instance.destroy();
        }

        this.instance = window.Yoti.Share.init({ elements: config });
      }
    }
  };

  protected handleScriptReady = () => {
    this.loaded = true;
    this.updateComponents();
  };

  protected createScriptTag = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);

    script.addEventListener('load', this.handleScriptReady);
  };
}
