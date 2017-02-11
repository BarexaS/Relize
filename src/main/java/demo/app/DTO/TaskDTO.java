package demo.app.DTO;

import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

public class TaskDTO {

    private long id;
    private String title;
    private String date;
    private String text;
    private boolean done;
    private MultipartFile[] files;

    public TaskDTO(String title,String date, String text, boolean done, long id, MultipartFile[] files) {
        this.title = title;
        this.date = date;
        this.text = text;
        this.done = done;
        this.id = id;
        this.files = files;
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

    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                ", text='" + text + '\'' +
                ", done=" + done +
                ", files=" + Arrays.toString(files) +
                '}';
    }
}
