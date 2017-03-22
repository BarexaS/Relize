package demo.app.entities;

import demo.app.DTO.TaskDTO;

import javax.persistence.*;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String date;
    private String text;
    private boolean done;
    private String monthForSearch;
    @Column(nullable = true)
    private Long groupId;
    @Column(nullable = true)
    private Long fileId;
    @Column(nullable = true)
    private String fileName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private CustomUser owner;

    public static Task fromDTO(CustomUser owner, TaskDTO taskDTO){
        String month = taskDTO.getDate().substring(0,taskDTO.getDate().lastIndexOf('-'));
        return new Task(taskDTO.getTitle(),taskDTO.getDate(), taskDTO.getText(),false,owner, month, taskDTO.getGroupId(), taskDTO.getFileName());
    }

    public Task(String title,String date, String text, boolean done, CustomUser owner, String monthForSearch, Long groupId, String fileName) {
        this.title = title;
        this.date = date;
        this.text = text;
        this.done = done;
        this.owner = owner;
        owner.addTask(this);
        this.monthForSearch = monthForSearch;
        this.groupId = groupId;
        this.fileName = fileName;
    }

    public String getMonthForSearch() {
        return monthForSearch;
    }

    public void setMonthForSearch(String monthForSearch) {
        this.monthForSearch = monthForSearch;
    }

    public long getId() {
        return id;
    }

    public Task() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public CustomUser getOwner() {
        return owner;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setOwner(CustomUser owner) {
        this.owner = owner;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                ", text='" + text + '\'' +
                ", done=" + done +
                ", monthForSearch='" + monthForSearch + '\'' +
                ", owner=" + owner +
                '}';
    }
}
