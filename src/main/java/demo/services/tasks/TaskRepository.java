package demo.services.tasks;

import demo.app.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t where t.owner.login = :login")
    List<Task> findByLogin(@Param("login") String login);

    @Query("SELECT t FROM Task t where t.owner.login = ?1 and t.monthForSearch = ?2")
    List<Task> findByLoginAndMonth(String login, String date);

    @Query("SELECT t FROM Task t where t.groupId = :groupId")
    List<Task> findByGroupId(@Param("groupId")Long groupId);

    @Query("SELECT t FROM Task t where t.groupId = ?1 and t.monthForSearch = ?2")
    List<Task> findByGroupIdAndMonth(Long groupId, String yearMonth);
}