import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
  },
});

const Home = () => {
  const [titleText] = useState('🐇 必 Best');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/bg.png')}
        resizeMode="contain" // 控制图片的缩放模式
      />
      <View style={styles.button}>
        <Button
          title="GO TO TASK"
          color={'#000'}
          onPress={() => navigation.navigate('Tasks' as never)}
        />
      </View>
    </View>
  );
};
export default Home;
