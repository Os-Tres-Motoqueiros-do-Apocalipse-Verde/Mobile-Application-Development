import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './src/routes/tab.routes'; // ou stack.routes, dependendo do que você usa

export default function App() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
