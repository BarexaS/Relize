package demo.app.entities;

import demo.app.enums.UserRole;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity
public class CustomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String login;
    private String password;
    private String secretWord;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Set<Todo> todos = new HashSet<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Set<Task> tasks = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "group_id")
    private Set<Group> invites = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_group",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"))
    private Set<Group> groups = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public CustomUser(String login, String password, String secretWord, UserRole role) {
        this.login = login;
        this.password = password;
        this.secretWord = secretWord;
        this.role = role;
    }

    public void addInvite(Group group){
        invites.add(group);
    }

    public void removeInvite(long groupId){
        Optional<Group> groupOptional = invites.stream().filter(g -> g.getId()==groupId).findFirst();
        if (groupOptional.isPresent()){
            invites.remove(groupOptional.get());
        }
    }

    public void acceptInvite(long groupId){
        Optional<Group> groupOptional = invites.stream().filter(g -> g.getId()==groupId).findFirst();
        if (groupOptional.isPresent()){
            Group group = groupOptional.get();
            invites.remove(group);
            group.addUser(this);
        }
    }

    public void addGroup(Group group){
        groups.add(group);
    }

    public String getSecretWord() {
        return secretWord;
    }

    public void setSecretWord(String secretWord) {
        this.secretWord = secretWord;
    }

    public void setTodos(Set<Todo> todos) {
        this.todos = todos;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public void addTodo(Todo todo) {
        todos.add(todo);
    }

    public CustomUser() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Set<Todo> getTodos() {
        return todos;
    }

    public void addTask(Task task) {
        tasks.add(task);
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    public void leaveGroup(Group group){
        this.groups.remove(group);
        group.removeUser(this);
    }

    public Set<Group> getInvites() {
        return invites;
    }
}