package demo.services.files;


import java.io.File;

public interface FileRegService {
    Long regFile(File file, Long userId);
    String getFilePath(Long Id);
}
