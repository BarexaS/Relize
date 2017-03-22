package demo.services.todos;

import demo.app.entities.Todo;

public interface TodosService {
    Todo[] getTodosByUserLogin(String login);
    Todo addTodo(Todo todo);
    void deleteTodo(long id);
    Todo getTodo(long id);
    Todo saveTodo(Todo todo);
}