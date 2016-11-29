package demo.services.todos;

import demo.app.Todo;

public interface TodosService {
    Todo[] getTodosByUserLogin(String login);
    Todo addTodo(Todo todo);
    void deleteTodo(long id);
    Todo getTodo(long id);
    Todo saveTodo(Todo todo);
}