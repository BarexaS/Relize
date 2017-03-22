package demo.services.files;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileRegServiceImpl implements FileRegService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Environment env;

    public Long regFile(File file, Long taskId) {
//        TODO доделать добавление файлов
        Long timeStamp = System.currentTimeMillis();
        String tableName = env.getProperty("database.userfiles.tablename");
        jdbcTemplate.update("INSERT INTO " + tableName + "(id, address, filename, task_id) VALUES (?,?,?,?)",
                timeStamp, file.getPath(), file.getName(), taskId);
        return timeStamp;
    }

    public String getFilePath(Long Id) {
        String tableName = env.getProperty("database.userfiles.tablename");
        String filePath = jdbcTemplate.queryForObject("SELECT address FROM " + tableName + " WHERE id = ?",
                new Object[]{Id}, String.class);
        return filePath;
    }
}
