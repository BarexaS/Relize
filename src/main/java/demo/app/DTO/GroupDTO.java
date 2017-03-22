package demo.app.DTO;

import demo.app.entities.CustomUser;
import demo.app.entities.Group;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Data transfer object for <@code>Group</@code> class.
 */
public class GroupDTO {
    private long id;
    private String name;
    private Set<String> usernames;

    public static GroupDTO creatDTO(Group group){
        GroupDTO result = new GroupDTO();
        result.id = group.getId();
        result.name = group.getName();
        result.usernames = result.collectUsernames(group);
        return result;
    }

    private Set<String> collectUsernames(Group group) {
        return group.getUsers().stream().map(CustomUser::getLogin).collect(Collectors.toSet());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getUsernames() {
        return usernames;
    }

    public void setUsernames(Set<String> usernames) {
        this.usernames = usernames;
    }
}
