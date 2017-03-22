package demo.app.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity, for users co-working
 */
@Entity
@Table(name = "Groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private CustomUser groupOwner;

    @ManyToMany(mappedBy = "groups", cascade = CascadeType.ALL)
    private Set<CustomUser> users = new HashSet<>();

    public void addUser(CustomUser user){
        users.add(user);
        user.addGroup(this);
    }

    public Group(String name, CustomUser owner) {
        this.name = name;
        this.groupOwner = owner;
    }

    public Group() {
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

    public Set<CustomUser> getUsers() {
        return users;
    }

    public void setUsers(Set<CustomUser> users) {
        this.users = users;
    }

    public CustomUser getOwner() {
        return groupOwner;
    }

    public void removeUser(CustomUser user){
        this.users.remove(user);
    }
}
