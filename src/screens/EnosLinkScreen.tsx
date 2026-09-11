import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import { Config } from '@config';
import { CustomTheme } from '@assets/colors';

const EnosLinkScreen: React.FC = () => {
  const { colors } = useTheme() as CustomTheme;
  const { enosLinkPanel } = Config.get('weather');
  const url = enosLinkPanel?.url;

  if (!url) {
    return null;
  }

  return (
    <View
      testID="enos_link_view"
      style={[styles.container, { backgroundColor: colors.screenBackground }]}>
      <WebView
        testID="enos_link_webview"
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState
        setSupportMultipleWindows={false}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primaryText} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EnosLinkScreen;
