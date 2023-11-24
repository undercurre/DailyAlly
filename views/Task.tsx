import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ListRenderItemInfo,
  Switch,
} from 'react-native';
import {fetchTaskList, fetchUpdateTask} from '../service';

const TaskScreen = () => {
  const [taskData, setTaskData] = useState<ApiManagement.Task[]>([]);

  // 在组件挂载时加载数据
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const fetchData = async () => {
      const taskRes = await fetchTaskList();
      if (taskRes.data) {
        console.log(taskRes.data);
        setTaskData(taskRes.data.data);
      }
    };

    fetchData();
  }

  const toggleSwitch = async (id: number) => {
    const cur = taskData.find(item => item.id === id);
    const res = await fetchUpdateTask(id, {
      ...cur?.attributes,
      completed: !cur?.attributes.completed,
    });
    if (res.data.data.id) {
      getData();
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<ApiManagement.Task>) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.attributes.name}</Text>
      <Text style={styles.title}>{item.attributes.workTime}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={item.attributes.completed ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => toggleSwitch(item.id)}
        value={item.attributes.completed}
      />
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
