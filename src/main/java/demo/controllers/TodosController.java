package demo.controllers;

import demo.app.CustomUser;
import demo.app.DTO.TodoDTO;
import demo.app.Todo;
import demo.services.todos.TodosService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class TodosController {

    @Autowired
    private UserService userService;

    @Autowired
    private TodosService todosService;


    @RequestMapping(value = "/api/todos", method = RequestMethod.POST)
    public TodoDTO addTodo(Principal principal, @RequestBody TodoDTO todoDTO) {
        CustomUser owner = userService.getUserByLogin(principal.getName());
        Todo todo = new Todo(todoDTO.getTitle(),todoDTO.getText(),false,owner);
        Todo temp = todosService.addTodo(todo);
        todoDTO.setId(temp.getId());
        return todoDTO;
    }

    @RequestMapping(value = "/api/todos", method = RequestMethod.GET)
    public TodoDTO[] user(Principal principal) {
        Todo[] arrayTodos = todosService.getTodosByUserLogin(principal.getName());
        TodoDTO[] result = new TodoDTO[arrayTodos.length];
        for (int i = 0; i < result.length; i++) {
            result[i] = new TodoDTO(arrayTodos[i].getTitle(),arrayTodos[i].getText(),arrayTodos[i].isDone(),arrayTodos[i].getId());
        }
        return result;
    }

    @RequestMapping(value = "/api/todos/{todo_id}", method = RequestMethod.PUT)
    public TodoDTO updateTodo(@RequestBody TodoDTO todoDTO,  @PathVariable("todo_id") long id) {
        Todo todo = todosService.getTodo(id);
        todo.setDone(todoDTO.isDone());
        todosService.saveTodo(todo);
        return todoDTO;
    }

    @RequestMapping(value = "/api/todos/{todo_id}", method = RequestMethod.DELETE)
    public TodoDTO updateTodo(@PathVariable("todo_id") long id, Principal principal) {
        Todo todo = todosService.getTodo(id);
        if (todo.getOwner().getLogin().equals(principal.getName())) {
            todosService.deleteTodo(id);
            return new TodoDTO(todo.getTitle(), todo.getText(), todo.isDone(), todo.getId());
        } else {
            return null;
        }
    }
}
