package demo.services.files;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileRegServiceImpl implements FileRegService{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Environment env;


    public Long regtFile(File file) {
//        TODO доделать добавление файлов
        Long timeStamp = System.currentTimeMillis();
        String tableName = env.getProperty("database.userfiles.tablename");
        jdbcTemplate.update("INSERT INTO "+ tableName+"(id, address, filename, owner_id, group_id) VALUES (?,?,?,?,?)",
                timeStamp, file.getPath(), file.getName());
        return timeStamp;
    }
}
