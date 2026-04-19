import { View } from 'react-native';
import AppText from '@/components/common/AppText';
import ScreenContainer from '@/components/common/ScreenContainer';

export default function PostDetailScreen() {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText variant="body">Post detail coming soon</AppText>
      </View>
    </ScreenContainer>
  );
}
