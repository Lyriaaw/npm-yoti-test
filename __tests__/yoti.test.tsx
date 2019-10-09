import React from 'react';
import { shallow, mount } from 'enzyme';
import YotiShare, { Yoti, withScriptManager } from '../src/Yoti';
import { IScriptManager } from '../src/ScriptManager';

type Mockify<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

describe('Yoti Functional Component', () => {
  test('it should render basic <div/> with correct id', () => {
    const wrapper = shallow(
      <Yoti domId="yoti_1" scenarioId="my_scenario_id" clientSdkId="my_sdk_id" />,
    );

    expect(wrapper.find('div#yoti_1')).toHaveLength(1);
  });
});

describe('YotiShare Component', () => {
  const scriptManagerMock: Mockify<IScriptManager> = {
    registerComponent: jest.fn(),
    deregisterComponent: jest.fn(),
  };

  beforeEach(() => {
    // Reset the mock before each run
    scriptManagerMock.registerComponent = jest.fn();
    scriptManagerMock.deregisterComponent = jest.fn();
  });

  test('it should pass className down', () => {
    const yoti = mount(
      <YotiShare
        domId="yoti_1"
        scenarioId="my_scenario_id"
        clientSdkId="my_sdk_id"
        className="my-class"
      />,
    ).find('div');

    expect(yoti.hasClass('my-class')).toBe(true);
  });

  test('it should pass style down', () => {
    const yoti = mount(
      <YotiShare
        domId="yoti_1"
        scenarioId="my_scenario_id"
        clientSdkId="my_sdk_id"
        style={{
          width: 200,
        }}
      />,
    ).find('div');

    expect(yoti.prop('style')).toHaveProperty('width', 200);
  });

  test('it should register component with script manager when mounted', () => {
    const YotiMockComponent = withScriptManager(scriptManagerMock, Yoti);
    const wrapper = shallow(
      <YotiMockComponent domId="yoti_1" clientSdkId="my_sdk_id" scenarioId="some_scenario_id" />,
    );

    expect(wrapper).not.toBeUndefined();
    expect(scriptManagerMock.registerComponent).toHaveBeenCalledTimes(1);
  });

  test('it should deregister component with script manager when unmounting', () => {
    const YotiMockComponent = withScriptManager(scriptManagerMock, Yoti);
    const wrapper = shallow(
      <YotiMockComponent domId="yoti_1" clientSdkId="my_sdk_id" scenarioId="some_scenario_id" />,
    );

    wrapper.unmount();
    expect(scriptManagerMock.deregisterComponent).toHaveBeenCalledTimes(1);
  });
});
