import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import login from '../api/Users/login';
// import style from '../css/Background.module.css';

function LoginScreen({ navigation }) {
  
  const handleLogin = async () => {
    const response = await login();
    console.log(response);
    if (response) {
      navigation.navigate('Home');
    } else {
      console.log('Login failed');
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0075FF']}
        style={styles.linear}
      >
        <Text style={styles.title}>LOGIN</Text>
        <SafeAreaView style={styles.form}>
          <TextInput style={styles.input} placeholder="Email" textContentType='emailAddress' />
          <TextInput style={styles.input} placeholder="Password" textContentType='password'/>
          <TouchableOpacity style={styles.button} onPress={handleLogin} >
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  linear: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#fff',
  },
  form: {
    width: '100%',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 250,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#0075FF',
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
  },
});