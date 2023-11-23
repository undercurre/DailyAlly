import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import {fetchTaskList} from '../service';

const TaskScreen = () => {
  const [taskData, setTaskData] = useState<ApiManagement.Task[]>([]);

  // 在组件挂载时加载数据
  useEffect(() => {
    const fetchData = async () => {
      const taskRes = await fetchTaskList();
      if (taskRes.data) {
        setTaskData(taskRes.data.data);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}: ListRenderItemInfo<ApiManagement.Task>) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.attributes.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default TaskScreen;
