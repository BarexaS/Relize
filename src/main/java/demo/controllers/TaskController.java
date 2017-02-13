package demo.controllers;

import demo.app.CustomUser;
import demo.app.DTO.TaskDTO;
import demo.app.Task;
import demo.services.tasks.TaskService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.security.Principal;

@RestController
public class TaskController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;


    @RequestMapping(value = "/api/tasks", method = RequestMethod.POST)
    public TaskDTO addTask(Principal principal, @RequestParam(value = "file", required = false) MultipartFile file, @RequestPart("task") @Valid TaskDTO taskDTO) {
        System.out.println(taskDTO);
        if (file != null) {
            System.out.println(file.getOriginalFilename());
        } else {
            System.out.println("there is no file!");
        }
        CustomUser owner = userService.getUserByLogin(principal.getName());
        String month = taskDTO.getDate().substring(0,taskDTO.getDate().lastIndexOf('-'));
        Task task = new Task(taskDTO.getTitle(),taskDTO.getDate(), taskDTO.getText(),false,owner, month);
        Task temp = taskService.addTask(task);
        taskDTO.setId(temp.getId());
        return taskDTO;
    }

    @RequestMapping(value = "/api/tasks/{task_year_month}", method = RequestMethod.GET)
    public TaskDTO[] getTasks(Principal principal, @PathVariable("task_year_month") String yearMonth) {
        Task[] arrayTasks = taskService.getTasksByUserLoginAndMonth(principal.getName(), yearMonth);
        TaskDTO[] result = new TaskDTO[arrayTasks.length];
        for (int i = 0; i < result.length; i++) {
            result[i] = new TaskDTO(arrayTasks[i].getTitle(), arrayTasks[i].getDate(), arrayTasks[i].getText(), arrayTasks[i].isDone(), arrayTasks[i].getId());
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
        return new TaskDTO(task.getTitle(), task.getDate(), task.getText(), task.isDone(), task.getId());
    }
}
