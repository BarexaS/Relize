package demo.app.DTO;

import demo.app.entities.Task;

public class TaskDTO {

    private long id;
    private String title;
    private String date;
    private String text;
    private boolean done;
    private Long groupId;
    private Long fileId;
    private String fileName;

    public static TaskDTO taskToDTO(Task task){
        return new TaskDTO(task.getTitle(), task.getDate(), task.getText(), task.isDone(), task.getId(), task.getGroupId(), task.getFileId(), task.getFileName());
    }

    public TaskDTO(String title,String date, String text, boolean done, long id, Long groupId, Long fileId, String fileName) {
        this.title = title;
        this.date = date;
        this.text = text;
        this.done = done;
        this.id = id;
        this.groupId = groupId;
        this.fileId = fileId;
        this.fileName = fileName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TaskDTO() {
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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
        return "TaskDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                ", text='" + text + '\'' +
                ", done=" + done +
                ", groupId=" + groupId +
                ", fileId=" + fileId +
                ", fileName='" + fileName + '\'' +
                '}';
    }
}
