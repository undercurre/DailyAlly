declare namespace ApiManagement {
  type TaskAttributes = {
    name: string;
    workTime: string;
    completed: boolean;
    description: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };

  type PageMeta = {
    pagination: {
      page: 1;
      pageSize: 25;
      pageCount: 1;
      total: 2;
    };
  };

  interface Task {
    id: number;
    attributes: TaskAttributes;
  }

  interface TaskList {
    data: Task[];
    meta: PageMeta;
  }

  interface CreateTaskDto
    extends Omit<TaskAttributes, 'createdAt' | 'updatedAt' | 'publishedAt'> {
    user: number;
  }

  type UpdateTaskDto = Partial<CreateTaskDto>;
}

declare namespace TaskManagement {
  interface Task extends ApiManagement.TaskAttributes {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
    id: number;
  }

  interface TaskPage {
    data: Task[];
    meta: ApiManagement.PageMeta;
  }
}
