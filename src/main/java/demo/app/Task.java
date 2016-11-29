package demo.app;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private CustomUser owner;

    public Task(String title,String date, String text, boolean done, CustomUser owner, String monthForSearch) {
        this.title = title;
        this.date = date;
        this.text = text;
        this.done = done;
        this.owner = owner;
        owner.addTask(this);
        this.monthForSearch = monthForSearch;
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
}
