import { Alert, View, TextInput, StyleSheet, Text, TouchableOpacity ,useColorScheme} from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../../config/initSupabase';
import { Button } from 'react-native-paper';

const theme = {
  dark: {
    background: '#151515',
    cardBackground: '#232323',
    text: '#fff',
    subText: '#999',
    border: '#8756c8',
    divider: '#333',
    primary: '#8756c8',
    secondary: '#bc85a3',
  },
  light: {
    background: '#ffffff',
    cardBackground: '#f5f5f5',
    text: '#000000',
    subText: '#666666',
    border: '#8756c8',
    divider: '#e0e0e0',
    primary: '#8756c8',
    secondary: '#bc85a3',
  },
};
const Login = () => {
   const colorScheme = useColorScheme();
  const colors = theme[colorScheme === 'dark' ? 'dark' : 'light'];

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const onSignInPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const onSignUpPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

   return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Spinner visible={loading} />
      
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: colors.text }]}>Filezuu</Text>
        <Text style={[styles.subHeader, { color: colors.subText }]}>Welcome back!</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email address"
          placeholderTextColor={colors.subText}
          value={email}
          onChangeText={setEmail}
          style={[styles.inputField, { 
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            color: colors.text
          }]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.subText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.inputField, { 
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            color: colors.text
          }]}
        />

        <TouchableOpacity 
          onPress={onSignInPress} 
          style={[styles.signInButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: colors.divider }]} />
          <Text style={[styles.dividerText, { color: colors.subText }]}>OR</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.divider }]} />
        </View>

        <Button 
          onPress={onSignUpPress} 
          mode="contained" 
          style={[styles.signUpButton, { backgroundColor: colors.secondary }]}
          labelStyle={styles.signUpButtonText}
        >
          Create an Account
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 100,
    alignItems: 'center',
    paddingVertical: 30,
  },
  header: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputField: {
    marginVertical: 8,
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  signInButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 14,
  },
  signUpButton: {
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Login;