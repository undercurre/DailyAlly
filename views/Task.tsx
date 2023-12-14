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
import {getTaskListByUser, editTask} from '../service';

const TaskScreen = () => {
  const [taskData, setTaskData] = useState<Task.Entity[]>([]);

  // 在组件挂载时加载数据
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const fetchData = async () => {
      const taskRes = await getTaskListByUser();
      if (taskRes.data) {
        setTaskData(taskRes.data);
      }
    };

    fetchData();
  }

  const toggleSwitch = async (id: string) => {
    const cur = taskData.find((item: Task.Entity) => item.id === id);
    if (cur) {
      cur as Task.Entity;
      const res = await editTask(id, {
        status: cur.status === 'Done' ? 'In Progress' : 'Done',
      });
      if (res.data.id) {
        getData();
      }
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<Task.Entity>) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.title}>{item.due_date}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={item.status === 'Done' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => toggleSwitch(item.id)}
        value={item.status === 'Done'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskData}
        renderItem={renderItem}
        keyExtractor={(item: Task.Entity) => item.id}
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
