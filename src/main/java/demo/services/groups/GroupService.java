package demo.services.groups;

import demo.app.entities.Group;

public interface GroupService {
    Group addGroup(Group group);
    void deleteGroup(long id);
    Group getGroup(long id);
    Group saveGroup(Group group);
}
