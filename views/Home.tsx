import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchLogin, fetchUserInfo} from '../service';
import {localStg} from '../utils/storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300, // 根据你的需求设置图片的宽度
    height: 300, // 根据你的需求设置图片的高度
  },
  title: {
    fontFamily: 'Cochin',
    fontSize: 40,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    width: 300,
    marginTop: 20,
  },
  textInput: {
    width: 300,
    alignItems: 'flex-start',
    fontSize: 16,
  },
});

const Home = () => {
  const [titleText] = useState('🐇 必 Best');
  const [userData, setUserData] = useState<Auth.UserInfo | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // 在组件挂载时加载数据
  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetchUserInfo();
      console.log('userRes', userRes);
      if (userRes.data.id) {
        setUserData(userRes.data);
        localStg.set('userInfo', userRes.data);
      }
    };

    fetchData();
  }, []);

  const handleButton = async () => {
    if (userData) {
      navigation.navigate('Tasks' as never);
    } else {
      const res = await fetchLogin({username, password});
      if (res.data) {
        localStg.set('token', res.data.jwt);
        localStg.set('userInfo', res.data.user);
        setUserData(res.data.user);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/bg.png')}
        resizeMode="contain" // 控制图片的缩放模式
      />
      <View>
        {userData ? (
          <View>
            <Text>Welcome back, {userData.username}!</Text>
          </View>
        ) : (
          <View>
            <TextInput
              underlineColorAndroid="black"
              style={styles.textInput}
              placeholder="邮箱"
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              underlineColorAndroid="black"
              style={styles.textInput}
              placeholder="密码"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        )}
      </View>
      <View style={styles.button}>
        <Button
          title={userData ? 'GO TO TASK' : 'SUBMIT'}
          color={'#000'}
          onPress={handleButton}
        />
      </View>
    </View>
  );
};
export default Home;
