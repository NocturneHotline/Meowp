import { Tabs } from 'expo-router';
import { MONO_FONT } from '@/constants/typography';
import { Colors } from '@/constants/colors';
import { TabIcon, type TabIconName } from '@/components/common/TabIcon';

const ACTIVE   = Colors.primaryDark;
const INACTIVE = Colors.gray400;

const TAB_MAP: Record<string, TabIconName> = {
  home: 'map', plan: 'routes', community: 'saved', profile: 'me',
};

const TAB_LABELS: Record<string, string> = {
  home:      '·map·',
  plan:      '·routes·',
  community: '·saved·',
  profile:   '·me·',
};

function tabIcon(name: string) {
  return ({ color }: { color: string; focused: boolean }) => (
    <TabIcon name={TAB_MAP[name]} color={color} size={24} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth:  1,
          borderTopColor:  Colors.border,
          elevation:       0,
          shadowOpacity:   0,
          height:          58,
          paddingBottom:   8,
          paddingTop:      6,
        },
        tabBarActiveTintColor:   ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: {
          fontFamily:    MONO_FONT,
          fontSize:      10,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: TAB_LABELS.home, tabBarIcon: tabIcon('home') }}
      />
      <Tabs.Screen
        name="plan"
        options={{ title: TAB_LABELS.plan, tabBarIcon: tabIcon('plan') }}
      />
      <Tabs.Screen
        name="community"
        options={{ title: TAB_LABELS.community, tabBarIcon: tabIcon('community') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: TAB_LABELS.profile, tabBarIcon: tabIcon('profile') }}
      />
    </Tabs>
  );
}
