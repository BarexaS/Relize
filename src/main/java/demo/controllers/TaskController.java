package demo.controllers;

import demo.app.DTO.TaskDTO;
import demo.app.entities.CustomUser;
import demo.app.entities.Task;
import demo.services.files.FileService;
import demo.services.tasks.TaskService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
public class TaskController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private FileService fileService;


    @RequestMapping(value = "/api/tasks", method = RequestMethod.POST)
    public TaskDTO addTask(Principal principal, @RequestParam(value = "file", required = false) MultipartFile file, @RequestPart("task") TaskDTO taskDTO) {
        CustomUser owner = userService.getUserByLogin(principal.getName());
        Task task = Task.fromDTO(owner, taskDTO);
        Task temp = taskService.addTask(task);
        if (file != null) {
            Long fileId = fileService.uploadFile(temp.getId(), owner.getId(), file);
            task.setFileId(fileId);
            task.setFileName(file.getOriginalFilename());
        }
        return TaskDTO.taskToDTO(taskService.saveTask(task));
    }

    @RequestMapping(value = "/api/tasks/{task_year_month}", method = RequestMethod.GET)
    public TaskDTO[] getTasks(Principal principal, @PathVariable("task_year_month") String yearMonth) {
        CustomUser user = userService.getUserByLogin(principal.getName());
        List<Task> temp = taskService.getUserTasksByMonth(user, yearMonth);
        TaskDTO[] result = new TaskDTO[temp.size()];
        for (int i = 0; i < result.length; i++) {
            result[i] = TaskDTO.taskToDTO(temp.get(i));
        }
        return result;
    }

    @RequestMapping(value = "/api/tasks/{task_id}", method = RequestMethod.PUT)
    public TaskDTO updateTask(@RequestBody TaskDTO taskDTO, @PathVariable("task_id") long id) {
        Task task = taskService.getTaskById(id);
        task.setDone(taskDTO.isDone());
        taskService.saveTask(task);
        return taskDTO;
    }

    @RequestMapping(value = "/api/tasks/{task_id}", method = RequestMethod.DELETE)
    public TaskDTO deleteTask(@PathVariable("task_id") long id) {
        Task task = taskService.getTaskById(id);
        taskService.deleteTaskById(id);
        return TaskDTO.taskToDTO(task);
    }
}
