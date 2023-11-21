import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

const Tasks = () => {
  // 示例数据
  const data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    // ... 可以添加更多的数据项
  ];

  // 渲染每一项的函数
  const renderItem = (item: {id: string; title: String}) => (
    <View style={styles.cell}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cell: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Tasks;
