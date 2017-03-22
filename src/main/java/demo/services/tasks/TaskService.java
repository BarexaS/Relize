package demo.services.tasks;

import demo.app.entities.CustomUser;
import demo.app.entities.Task;

import java.util.List;

public interface TaskService {
    List<Task> getUserTasks(CustomUser user);
    List<Task> getTasksByUserLogin(String login);
    List<Task> getUserTasksByMonth(CustomUser user, String yearMonth);
    List<Task> getTasksByUserLoginAndMonth(String login, String month);
    Task addTask(Task task);
    void deleteTaskById(long id);
    Task getTaskById(long id);
    Task saveTask(Task task);
    List<Task> getGroupTasksByMonth(CustomUser user, String yearMonth);
}