import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

function LoginScreen({ navigation }) {

  // const navigation = useNavigation();
  // const Index = () => {
  //   console.log('test');
  //   navigation.navigate('Test');
  //   console.log('test2');
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <SafeAreaView style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />
        <Button title="Connexion" style={styles.button} 
            onPress={() => navigation.navigate('HomeLoggedScreen')}
            // onPress={() =>
            //   console.log(navigation.navigate)
            //   // navigation.navigate('HomeLoggedScreen', {name: 'Jane'})
            // }
          />
      </SafeAreaView>
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