package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class UiApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(UiApplication.class, args);
	}

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private Environment env;

	@Override
	public void run(String... strings) throws Exception {
		// Создание адресной таблицы файлов
		String tableName = env.getProperty("database.userfiles.tablename");
		jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS "+tableName+"("+
				"id bigint, adress VARCHAR, filename VARCHAR, owner_id bigint, group_id bigint)");
	}
}
