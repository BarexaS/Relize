package demo.services.todos;

import demo.app.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodosServiceImpl implements TodosService {
    @Autowired
    private TodosRepository todosRepository;

    @Override
    @Transactional(readOnly = true)
    public Todo[] getTodosByUserLogin(String login) {
        Todo[] result = todosRepository.findByLogin(login).toArray(new Todo[0]);
        return result;
    }

    @Override
    @Transactional
    public Todo addTodo(Todo todo) {
        return todosRepository.save(todo);
    }

    @Override
    @Transactional
    public void deleteTodo(long id) {
        todosRepository.delete(id);
    }

    @Override
    @Transactional
    public Todo getTodo(long id) {
        return todosRepository.findOne(id);
    }

    @Override
    public Todo saveTodo(Todo todo) {
        return todosRepository.save(todo);
    }
}