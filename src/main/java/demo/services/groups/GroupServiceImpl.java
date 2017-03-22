package demo.services.groups;

import demo.app.entities.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupsRepository groupsRepository;

    @Override
    public Group addGroup(Group group) {
        return groupsRepository.saveAndFlush(group);
    }

    @Override
    public void deleteGroup(long id) {
        groupsRepository.delete(id);
    }

    @Override
    public Group getGroup(long id) {
        return groupsRepository.findOne(id);
    }

    @Override
    public Group saveGroup(Group group) {
        return groupsRepository.saveAndFlush(group);
    }

}
