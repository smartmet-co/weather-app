import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import EnosLinkPanel from '../../src/components/weather/EnosLinkPanel';

const mockNavigate = jest.fn();
const mockTrackMatomoEvent = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@utils/matomo', () => ({
  trackMatomoEvent: (...args: any[]) => mockTrackMatomoEvent(...args),
}));

describe('EnosLinkPanel', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockTrackMatomoEvent.mockReset();
  });

  it('renders the localized title and description', () => {
    const { getByText } = render(<EnosLinkPanel />);

    expect(getByText('enosLinkPanel.title')).toBeTruthy();
    expect(getByText('enosLinkPanel.description')).toBeTruthy();
  });

  it('navigates to the EnosLink screen and tracks the event on press', () => {
    const { getByTestId } = render(<EnosLinkPanel />);

    fireEvent.press(getByTestId('enos_link_panel'));

    expect(mockTrackMatomoEvent).toHaveBeenCalledWith(
      'User action',
      'Weather',
      'Open ENOS microsite'
    );
    expect(mockNavigate).toHaveBeenCalledWith('EnosLink');
  });

  it('uses a custom image when provided', () => {
    const customImage = { uri: 'https://example.test/enos.png' };
    const view = render(<EnosLinkPanel image={customImage} />);

    expect(view.UNSAFE_getByProps({ source: customImage })).toBeTruthy();
  });
});
