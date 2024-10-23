import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';
import { WelcomeScreen } from './features/welcome/WelcomeScreen';
import { WithdrawalScreen } from './features/withdrawal/WithdrawalScreen';
import { MaintenanceScreen } from './features/maintenance/MaintenanceScreen';

const Stack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
          <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
