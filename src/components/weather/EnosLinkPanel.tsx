import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Text from '@components/common/AppText';
import AccessibleTouchableOpacity from '@components/common/AccessibleTouchableOpacity';
import { WHITE, BLACK, ORANGE } from '@assets/colors';
import { BOLD_FONT } from '@assets/constants';
import { trackMatomoEvent } from '@utils/matomo';
import type { WeatherStackParamList } from '@navigators/stacks/types';

// Bundled fallback image. Forks can replace this asset or pass a custom `image` prop.
// This should be a plain background photo — the title/button are drawn on top by this
// component, not baked into the image.
const DEFAULT_IMAGE = require('@assets/images/enos-press-release.webp');

// Real aspect ratio of the bundled image (640x360). Keeping the panel locked to this ratio
// makes it scale proportionally on any device/orientation instead of being cropped unevenly.
const IMAGE_ASPECT_RATIO = 16 / 9;

// Text shadow so the title stays legible regardless of what's behind the veil.
const TEXT_SHADOW_COLOR = 'rgba(0,0,0,0.75)';
const VEIL_BACKGROUND = 'rgba(31,41,37,0.55)';
const DOT_TEAL = '#4FD1C5';
const DOT_GREEN = '#7ED957';

type EnosLinkPanelProps = {
  image?: ImageSourcePropType;
};

const EnosLinkPanel: React.FC<EnosLinkPanelProps> = ({ image = DEFAULT_IMAGE }) => {
  const { t } = useTranslation('weather');
  const navigation = useNavigation<NavigationProp<WeatherStackParamList>>();

  const openEnosMicrosite = () => {
    trackMatomoEvent('User action', 'Weather', 'Open ENOS microsite');
    navigation.navigate('EnosLink');
  };

  return (
    <AccessibleTouchableOpacity
      testID="enos_link_panel"
      style={styles.wrapper}
      onPress={openEnosMicrosite}
      accessibilityRole="button"
      accessibilityLabel={t('enosLinkPanel.title')}
      accessibilityHint={t('enosLinkPanel.accessibilityHint')}>
      <ImageBackground
        testID="enos_link_background"
        source={image}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.veil}>
            <View style={styles.dotsRow} accessible={false} importantForAccessibility="no">
              <View style={[styles.dot, styles.dotTeal]} />
              <View style={[styles.dot, styles.dotGreen]} />
              <View style={[styles.dot, styles.dotOrange]} />
            </View>
            <Text
              accessibilityRole="header"
              style={styles.title}
              numberOfLines={3}>
              {t('enosLinkPanel.title')}
            </Text>
          </View>
          {/* Visual only: the whole card above is the single touch target. */}
          <View style={styles.buttonPill}>
            <Text style={styles.buttonText} numberOfLines={1}>
              {t('enosLinkPanel.buttonText')}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </AccessibleTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // Locks the card to the background image's real ratio (640x360) so it scales
    // proportionally with the available width on any device or orientation, instead
    // of a fixed height that made `resizeMode="cover"` crop unevenly on rotation.
    aspectRatio: IMAGE_ASPECT_RATIO,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    borderRadius: 14,
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  veil: {
    maxWidth: '78%',
    backgroundColor: VEIL_BACKGROUND,
    borderRadius: 14,
    padding: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  dotTeal: {
    backgroundColor: DOT_TEAL,
  },
  dotGreen: {
    backgroundColor: DOT_GREEN,
  },
  dotOrange: {
    backgroundColor: ORANGE,
  },
  title: {
    fontFamily: BOLD_FONT,
    fontSize: 16,
    color: WHITE,
    textShadowColor: TEXT_SHADOW_COLOR,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  buttonPill: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: ORANGE,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontFamily: BOLD_FONT,
    fontSize: 14,
    color: WHITE,
  },
});

export default EnosLinkPanel;
