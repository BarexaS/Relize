package demo.services.tasks;

import demo.app.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    @Transactional(readOnly = true)
    public Task[] getTasksByUserLogin(String login) {
        Task[] result = taskRepository.findByLogin(login).toArray(new Task[0]);
        return result;
    }

    @Override
    public Task[] getTasksByUserLoginAndMonth(String login, String month) {
        Task[] result = taskRepository.findByLoginAndMonth(login,month).toArray(new Task[0]);
        return result;
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
    public Task getTaskById(long id) {
        return taskRepository.findOne(id);
    }

    @Override
    @Transactional
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
}