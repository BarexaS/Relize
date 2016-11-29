package demo.services.todos;

import demo.app.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface TodosRepository extends JpaRepository<Todo, Long> {
    @Query("SELECT t FROM Todo t where t.owner.login = :login")
    List<Todo> findByLogin(@Param("login") String login);
}