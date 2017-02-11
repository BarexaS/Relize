package demo.controllers;

import demo.app.DTO.TaskDTO;
import demo.app.Task;
import demo.services.tasks.TaskService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
public class TaskController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;


    @RequestMapping(value = "/api/tasks", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public TaskDTO addTask(Principal principal, @RequestPart("files") MultipartFile file, @RequestPart("text") String text) {
        System.out.println("lol");
        System.out.println(text);
        System.out.println(file.getOriginalFilename());
//        for (MultipartFile file : files) {
//            if (file.isEmpty()) {
//                System.out.println("pusto");
//            } else {
//                System.out.println(file.getOriginalFilename());
//            }
//        }
//        System.out.println(taskDTO);
//        System.out.println(files.length);
//        System.out.println(files.getOriginalFilename());
//        CustomUser owner = userService.getUserByLogin(principal.getName());
//        String month = taskDTO.getDate().substring(0,taskDTO.getDate().lastIndexOf('-'));
//        Task task = new Task(taskDTO.getTitle(),taskDTO.getDate(), taskDTO.getText(),false,owner, month,taskDTO.getFiles());
//        System.out.println(task);
//        Task temp = taskService.addTask(task);
//        taskDTO.setId(temp.getId());
//        return taskDTO;
        return new TaskDTO();
    }

    @RequestMapping(value = "/api/tasks/{task_year_month}", method = RequestMethod.GET)
    public TaskDTO[] getTasks(Principal principal, @PathVariable("task_year_month") String yearMonth) {
        Task[] arrayTasks = taskService.getTasksByUserLoginAndMonth(principal.getName(), yearMonth);
        TaskDTO[] result = new TaskDTO[arrayTasks.length];
        for (int i = 0; i < result.length; i++) {
            result[i] = new TaskDTO(arrayTasks[i].getTitle(), arrayTasks[i].getDate(), arrayTasks[i].getText(), arrayTasks[i].isDone(), arrayTasks[i].getId(), arrayTasks[i].getFiles());
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
        return new TaskDTO(task.getTitle(), task.getDate(), task.getText(), task.isDone(), task.getId(), task.getFiles());
    }
}
