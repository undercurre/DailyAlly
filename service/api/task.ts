import request from '../request';
// 获取用户的任务列表
export function getTaskListByUser() {
  return request.get<Array<Task.Entity>>('/tasks/findByUserId');
};

// 编辑任务
export function editTask(id: Task.Entity["id"], data: Task.ReqUpdateData) {
  return request.put(`/tasks/update?id=${id}`, data);
};