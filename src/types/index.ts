export type WebShareButtonProps = {
  label?: string,
  align?: 'center' | 'left' | 'right',
  width?: 'auto' | 'full'
};

export type WebShareCompleteProps = {
  closeDelay?: Number,
  tokenHandler: Function
};

export type WebShareConfig = {
  domId: string,
  clientSdkId: string,
  scenarioId: string,
  shareUrl?: string
  button?: WebShareButtonProps,
};

export interface YotiShare extends WebShareConfig, React.HTMLAttributes<HTMLElement> { }

export interface IScriptManager {
  registerComponent: (id: string, config: WebShareConfig) => void;
  deregisterComponent: (id: string) => void;
}
