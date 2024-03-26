import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_c2F2ZWQtcmF0LTU2LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <Text className='my-20 text-center text-red-600 bg-slate-500 text-lg font-bold p-4'>You are SignedIn</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>

      </View>
    </ClerkProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
