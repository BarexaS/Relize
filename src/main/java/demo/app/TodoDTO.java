package demo.app;

public class TodoDTO {
    private String title;
    private String text;
    private boolean done;
    private long id;

    public TodoDTO(String title, String text, boolean done, long id) {
        this.title = title;
        this.text = text;
        this.done = done;
        this.id = id;
    }

    public TodoDTO() {
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
