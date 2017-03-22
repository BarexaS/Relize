package demo.services.tasks;

import demo.app.entities.CustomUser;
import demo.app.entities.Group;
import demo.app.entities.Task;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional(readOnly = true)
    public List<Task> getTasksByUserLogin(String login) {
        return taskRepository.findByLogin(login);
    }

    @Override
    public List<Task> getTasksByUserLoginAndMonth(String login, String month) {
        return taskRepository.findByLoginAndMonth(login, month);
    }

    @Override
    @Transactional
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public void deleteTaskById(long id) {
        taskRepository.delete(id);
    }

    @Override
    public List<Task> getGroupTasksByMonth(CustomUser user, String yearMonth) {
        List<Task> result = new LinkedList<>();
        user.getGroups().stream()
                .map(Group::getId)
                .map(groupId -> taskRepository.findByGroupIdAndMonth(groupId, yearMonth))
                .forEach(result::addAll);
        return result;
    }

    @Override
    public Task getTaskById(long id) {
        return taskRepository.findOne(id);
    }

    @Override
    @Transactional
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }


    @Override
    public List<Task> getUserTasksByMonth(CustomUser user, String yearMonth) {
        List<Task> userTasks = getTasksByUserLoginAndMonth(user.getLogin(), yearMonth);
        List<Task> groupTasks = getGroupTasksByMonth(user, yearMonth);
        List<Task> temp = new ArrayList<>();
        temp.addAll(userTasks);
        temp.addAll(groupTasks);
        return temp;
    }

    @Override
    public List<Task> getUserTasks(CustomUser user) {
        List<Task> result = getTasksByUserLogin(user.getLogin());
        user.getGroups().stream()
                .map(Group::getId)
                .map(taskRepository::findByGroupId)
                .forEach(result::addAll);
        return result;
    }
}