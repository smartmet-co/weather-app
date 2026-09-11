import React from 'react';
import { render } from '@testing-library/react-native';

import EnosLinkScreen from '../../src/screens/EnosLinkScreen';

const mockConfigGet = jest.fn();

jest.mock('@config', () => ({
  Config: {
    get: (...args: any[]) => mockConfigGet(...args),
  },
}));

jest.mock('@react-navigation/native', () => ({
  useTheme: () => ({
    colors: { screenBackground: '#fff', primaryText: '#000' },
  }),
}));

jest.mock('react-native-webview', () => ({
  WebView: (props: any) => {
    const ReactActual = require('react');
    const { View } = require('react-native');
    return ReactActual.createElement(View, props);
  },
}));

describe('EnosLinkScreen', () => {
  beforeEach(() => {
    mockConfigGet.mockReset();
  });

  it('renders a WebView pointing at the configured microsite URL', () => {
    mockConfigGet.mockReturnValue({
      enosLinkPanel: { url: 'https://enos.example.test/microsite' },
    });

    const { getByTestId } = render(<EnosLinkScreen />);

    const webview = getByTestId('enos_link_webview');
    expect(webview.props.source).toEqual({
      uri: 'https://enos.example.test/microsite',
    });
  });

  it('renders nothing when no URL is configured', () => {
    mockConfigGet.mockReturnValue({});

    const { toJSON } = render(<EnosLinkScreen />);
    expect(toJSON()).toBeNull();
  });
});
