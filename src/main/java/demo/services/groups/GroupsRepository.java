package demo.services.groups;


import demo.app.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupsRepository extends JpaRepository<Group, Long> {
    @Query("SELECT g FROM Group g where g.name = :name")
    List<Group> findByName(@Param("name") String name);
}
