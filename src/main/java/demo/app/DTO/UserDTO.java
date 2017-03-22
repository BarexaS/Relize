package demo.app.DTO;

public class UserDTO {
    private String login;
    private String password;
    private String repPassword;
    private String secretWord;

    public UserDTO() {
    }

    public UserDTO(String login, String password, String confPassword, String secretWord) {
        this.login = login;
        this.password = password;
        this.repPassword = confPassword;
        this.secretWord = secretWord;
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

    public String getRepPassword() {
        return repPassword;
    }

    public void setRepPassword(String repPassword) {
        this.repPassword = repPassword;
    }

    public String getSecretWord() {
        return secretWord;
    }

    public void setSecretWord(String secretWord) {
        this.secretWord = secretWord;
    }
}
