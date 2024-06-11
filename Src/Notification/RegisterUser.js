import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import {firebase} from '@react-native-firebase/auth';

export default function RegisterUser({navigation}) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onchangeEmail = text => {
    setEmail(text);
  };

  const onchangeName = text => {
    setName(text);
  };

  const onchangePassword = text => {
    setPassword(text);
  };

  const onchangeConfirmPassword = text => {
    setConfirmPassword(text);
  };

  const onPressRegisterDone = async () => {
    if (password === confirmPassword) {
      if (name && email && password) {
        try {
          const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
          if (response) {
            Alert.alert('User Registered Successfully');
            navigation.navigate('Map');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          }
        } catch (error) {
          console.log('Error in onPressRegister', error);
          Alert.alert('User already Exist');
        }
      }
    }
  };

  const onPressRegister = () => {};

  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'transparent'}}>
      <View style={styles.main}>
        <Text style={styles.title}>RegisterUser</Text>
        <View style={styles.innerview}>
          <TextInput
            placeholder="Enter Email"
            style={styles.inputsty}
            placeholderTextColor={'gray'}
            onChangeText={onchangeEmail}
            value={email}
          />
          <TextInput
            placeholder="Enter Name"
            style={styles.inputsty}
            placeholderTextColor={'gray'}
            onChangeText={onchangeName}
            value={name}
          />
          <TextInput
            placeholder="Enter Password"
            style={styles.inputsty}
            placeholderTextColor={'gray'}
            onChangeText={onchangePassword}
            value={password}
          />
          <TextInput
            placeholder="Enter Confirm Password"
            style={styles.inputsty}
            placeholderTextColor={'gray'}
            onChangeText={onchangeConfirmPassword}
            value={confirmPassword}
          />
          <Button title="Register" onPress={onPressRegisterDone} />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  innerview: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    gap: 20,
  },
  inputsty: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
  },
});
