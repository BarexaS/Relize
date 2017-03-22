package demo.services.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;


@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileRegService fileRegService;

    public Long uploadFile(Long taskId, Long ownerId, MultipartFile multipartFile) {
        File file = fileCreating(ownerId, multipartFile);
        Long result = fileRegService.regFile(file, taskId);
        return result;
    }

    public File getFile(Long id) {
        String filePath = fileRegService.getFilePath(id);
        File file = new File(filePath);
        if (file.exists()){
            return file;
        }
        return null;
    }

    private File fileCreating(Long userId, MultipartFile multipartFile) {
        File userDir = creatUserDir(userId);
        File file = new File(userDir.getPath()+"/"+multipartFile.getOriginalFilename());
        try(FileOutputStream writer = new FileOutputStream(file))
        {
            if (file.exists()){
                writer.write(multipartFile.getBytes());
                writer.flush();
            }
        }
        catch(IOException ex){
//            TODO Обработка изключения при записи пользовательского файла
            System.out.println(ex.getMessage());
        }
        return file;
    }

    private File creatUserDir(Long userId) {
        File userDir = new File("user_files/"+userId.toString());
        if (!userDir.exists()){
            userDir.mkdirs();
        }
        return userDir;
    }


}
