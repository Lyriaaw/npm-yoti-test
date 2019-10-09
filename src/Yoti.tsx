import React from 'react';

import ScriptManager, { IScriptManager } from './ScriptManager';

/**
 * Functional component used for rendering
 * the div that that button will be injected into.
 * @param domId - the domId that the button will be rendered on
 */
// eslint-disable-next-line max-len
export const Yoti: React.SFC<YotiProps> = ({ domId, style, className }: YotiProps) => <div id={domId} style={style} className={className} />;

export type YotiButtonProps = {
  label?: string,
  align?: 'center' | 'left' | 'right',
  width?: 'auto' | 'full'
};

export interface YotiProps extends React.HTMLAttributes<HTMLElement> {
  domId: string,
  clientSdkId: string,
  scenarioId: string,
  shareUrl?: string
  button?: YotiButtonProps,
}

export function withScriptManager<T extends YotiProps>(
  scriptManager: IScriptManager,
  WrappedComponent: React.ComponentType<T>,
) {
  return class extends React.Component<T> {
    componentDidMount() {
      scriptManager.registerComponent(this);
    }

    componentWillUnmount() {
      scriptManager.deregisterComponent(this);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

const scriptManager = new ScriptManager();
export default withScriptManager(scriptManager, Yoti);
