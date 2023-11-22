export function adapterOfFetchTaskList(
  data: ApiManagement.TaskList | null,
): TaskManagement.TaskPage {
  if (!data) {
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 2,
        },
      },
    };
  }
  return {
    data: data.data.map((item, index) => {
      const task: TaskManagement.Task = {
        index: index + 1,
        key: item.id.toString(),
        id: item.id,
        ...item.attributes,
      };

      return task;
    }),
    meta: data?.meta,
  };
}
