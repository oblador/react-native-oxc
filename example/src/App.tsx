import { StyleSheet, View, Image, Text } from 'react-native';
import { PlatformSpecific } from './PlatformSpecific';
import { TSConfigAlias } from '@tsconfig-alias';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./logo-square.png')} />
      <Text style={styles.title}>react-native-oxc</Text>
      <PlatformSpecific />
      <TSConfigAlias />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logo: {
    width: '50%',
    height: null,
    aspectRatio: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
});
