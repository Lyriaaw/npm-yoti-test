import React from 'react';

import { IScriptManager, YotiShare } from './types';

export default function withScriptManager<T extends YotiShare>(
  scriptManager: IScriptManager,
  WrappedComponent: React.ComponentType<T>,
) {
  return class extends React.Component<T> {
    componentDidMount() {
      const {
        domId, clientSdkId, scenarioId, button, shareUrl,
      } = this.props;

      scriptManager.registerComponent(domId, {
        domId,
        clientSdkId,
        scenarioId,
        button,
        shareUrl,
      });
    }

    shouldComponentUpdate(nextProps) {
      if (nextProps === this.props) {
        return false;
      }

      return true;
    }

    componentWillUnmount() {
      const { domId } = this.props;
      scriptManager.deregisterComponent(domId);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
