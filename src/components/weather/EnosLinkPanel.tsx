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
import { WHITE } from '@assets/colors';
import { BOLD_FONT, REGULAR_FONT } from '@assets/constants';
import { trackMatomoEvent } from '@utils/matomo';
import type { WeatherStackParamList } from '@navigators/stacks/types';

// Bundled fallback image. Forks can replace this asset or pass a custom `image` prop.
const DEFAULT_IMAGE = require('@assets/images/enos-press-release.webp');

// Text shadow so the white title/description stay legible on top of any image.
const TEXT_SHADOW_COLOR = 'rgba(0,0,0,0.75)';

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
        source={image}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.content}>
          <Text
            accessibilityRole="header"
            style={styles.title}
            numberOfLines={2}>
            {t('enosLinkPanel.title')}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {t('enosLinkPanel.description')}
          </Text>
        </View>
      </ImageBackground>
    </AccessibleTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    borderRadius: 10,
    minHeight: 160,
    overflow: 'hidden',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  background: {
    flex: 1,
    minHeight: 160,
  },
  backgroundImage: {
    borderRadius: 10,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: BOLD_FONT,
    fontSize: 18,
    color: WHITE,
    textShadowColor: TEXT_SHADOW_COLOR,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  description: {
    fontFamily: REGULAR_FONT,
    fontSize: 14,
    color: WHITE,
    marginTop: 12,
    textShadowColor: TEXT_SHADOW_COLOR,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default EnosLinkPanel;
