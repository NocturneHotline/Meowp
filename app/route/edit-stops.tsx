import { View } from 'react-native';
import AppText from '@/components/common/AppText';
import ScreenContainer from '@/components/common/ScreenContainer';

export default function StubScreen() {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText variant="body">Coming soon</AppText>
      </View>
    </ScreenContainer>
  );
}
