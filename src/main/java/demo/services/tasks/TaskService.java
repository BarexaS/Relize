package demo.services.tasks;

import demo.app.Task;

public interface TaskService {
    Task[] getTasksByUserLogin(String login);
    Task[] getTasksByUserLoginAndMonth(String login,String month);
    Task addTask(Task task);
    void deleteTaskById(long id);
    Task getTaskById(long id);
    Task saveTask(Task task);
}