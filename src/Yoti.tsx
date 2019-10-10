/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import ScriptManager from './ScriptManager';
import withScriptManager from './ScriptManagerHOC';

import { YotiShare } from './types';

/**
 * Functional component used for rendering
 * the div that that button will be injected into.
 * @param domId - the domId that the button will be rendered on
 */
// eslint-disable-next-line max-len
export class YotiComponent extends React.Component<YotiShare> {
  render() {
    const {
      domId, clientSdkId, scenarioId, button, shareUrl, ...rest
    } = this.props;
    return (
      <div {...({ id: domId, ...rest } as React.HTMLAttributes<HTMLElement>)} />
    );
  }
}

const scriptManager = new ScriptManager();
export default withScriptManager(scriptManager, YotiComponent);
