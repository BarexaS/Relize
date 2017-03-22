package demo.controllers;

import demo.app.entities.CustomUser;
import demo.app.entities.Task;
import demo.services.files.FileService;
import demo.services.tasks.TaskService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.Principal;
import java.util.List;

@Controller
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @RequestMapping("/get-file/{taskId}/{fileId}")
    public void getFile(@PathVariable("fileId") Long id,@PathVariable("taskId") Long taskId, HttpServletResponse resp, Principal principal){
        CustomUser user = userService.getUserByLogin(principal.getName());
        if (isUserTask(user, taskId)) {
            File file = fileService.getFile(id);
            if (file != null) {
                resp.setContentType("application/octet-stream");
                resp.addHeader("Content-Disposition", "attachment; filename=" + file.getName());
                resp.setContentLengthLong(file.length());
                try (OutputStream os = resp.getOutputStream();
                     FileInputStream is = new FileInputStream(file)) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = is.read(buffer)) != -1) {
                        os.write(buffer, 0, bytesRead);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private boolean isUserTask(CustomUser user, Long taskId) {
        List<Task> tasks = taskService.getUserTasks(user);
        return tasks.stream().filter(task -> task.getId()==taskId).count() > 0;
    }
}
