package demo.app;

import javax.persistence.*;
import java.util.HashSet;
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

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public CustomUser(String login, String password, String secretWord, UserRole role) {
        this.login = login;
        this.password = password;
        this.secretWord = secretWord;
        this.role = role;
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

    public void addTodo(Todo todo){
        todos.add(todo);
    }

    public CustomUser() {}

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
}