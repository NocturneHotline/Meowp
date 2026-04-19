import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MONO_FONT } from '@/constants/typography';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ACTIVE   = '#6aaa82';
const INACTIVE = '#aaa';

function tabIcon(inactive: IoniconName, active: IoniconName) {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons name={focused ? active : inactive} size={20} color={color} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth:  1,
          borderTopColor:  '#ebebeb',
          elevation:       0,
          shadowOpacity:   0,
          height:          56,
          paddingBottom:   6,
          paddingTop:      6,
        },
        tabBarActiveTintColor:   ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: {
          fontFamily:    MONO_FONT,
          fontSize:      10,
          fontWeight:    '500',
          letterSpacing: 0.5,
          marginTop:     2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:      '地图',
          tabBarIcon: tabIcon('map-outline', 'map'),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title:      '路线',
          tabBarIcon: tabIcon('navigate-outline', 'navigate'),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title:      '收藏',
          tabBarIcon: tabIcon('bookmark-outline', 'bookmark'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title:      '我的',
          tabBarIcon: tabIcon('person-outline', 'person'),
        }}
      />
    </Tabs>
  );
}
