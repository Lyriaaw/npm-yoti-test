// import * as React from 'react';
import _ from 'lodash';

export interface IScriptManager {
  registerComponent: (component: any) => void;
  deregisterComponent: (component: any) => void;
}

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

  registerComponent = component => {
    this.components[component.props.domId] = component;
    this.updateComponents();
  };

  deregisterComponent = component => {
    delete this.components[component.props.domId];
    this.updateComponents();
  };

  protected updateComponents = () => {
    if (this.loaded) {
      const keys = Object.keys(this.components);
      if (keys.length > 0) {
        const config = keys.map(componentKey => this.components[componentKey].props);

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
