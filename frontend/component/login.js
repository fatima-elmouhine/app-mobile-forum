import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

export default function Login() {

  const handleLogin = () => {
    console.log('login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <SafeAreaView style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />
        <Button title="Connexion" style={styles.button} onPress={handleLogin}/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 250
  },
  button: {
    width: '100%',
    padding: 20,
  },
});