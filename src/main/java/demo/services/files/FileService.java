package demo.services.files;


import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface FileService {
    Long uploadFile(Long taskId, Long ownerId, MultipartFile file);
    File getFile(Long id);
}
