import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useSendPasswordResetEmailMutation } from '../../../services/userAuthApi';
import { styles, toastConfig } from '../../../style';

const SendPasswordResetEmailScreen = () => {
  const [email, setEmail] = useState('');
  const clearTextInput = () => {
    setEmail('');
  };
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();

  const handleFormSubmit = async () => {
    const formdata = { email };
    const res = await sendPasswordResetEmail(formdata);
    if (res.data) {
      clearTextInput();
      Toast.show({
        type: 'done',
        position: 'top',
        topOffset: 0,
        text1: res.data.msg,
      });
    }
    if (res.error) {
      clearTextInput();
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        ...(res.error.data.errors.email
          ? { text1: res.error.data.errors.email[0] }
          : ''),
        ...(res.error.data.errors.non_field_errors
          ? { text1: res.error.data.errors.non_field_errors[0] }
          : ''),
      });
    }
  };
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <View style={{ marginHorizontal: 30 }}>
        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Write Your Email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
          <Button title="Send" onPress={handleFormSubmit} color="#2980B9" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendPasswordResetEmailScreen;
