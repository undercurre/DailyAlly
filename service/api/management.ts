import {adapter} from '~/src/utils';
import {request} from '../request';
import {adapterOfFetchTaskList} from './management.adapter';

/**
@description 获取任务列表
*/

export const fetchTaskList = async () => {
  const data = await request.get<ApiManagement.TaskList | null>(
    '/api/projects',
  );
  return adapter(adapterOfFetchTaskList, data);
};

/**
@description 创建任务
*/

export const fetchCreateTask = async (form: ApiManagement.CreateTaskDto) => {
  const data = await request.post<ApiManagement.Task>('/api/projects', {
    data: {
      ...form,
    },
  });
  return data;
};

/**
@description 更新任务
*/

export const fetchUpdateTask = async (
  taskId: number,
  form: ApiManagement.UpdateTaskDto,
) => {
  const data = await request.put<ApiManagement.Task>(
    `/api/projects/${taskId}`,
    {
      data: {
        ...form,
      },
    },
  );
  return data;
};

/**
@description 删除任务
*/

export const fetchDeleteTask = async (taskId: number) => {
  const data = await request.delete<ApiManagement.Task>(
    `/api/projects/${taskId}`,
  );
  return data;
};
