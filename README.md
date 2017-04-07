# Relize
Typical task tracker.

You can create notes and tasks. 

Notes consisting of title and text. 

Task consists title, text, date for task, and can storing one file (max size of file - 5mb).

For cooperating users can geather in groups. Anyone can creat group and invite other users.

Anyone in group can creat tasks for all group.

# Server
Server running by Spring Boot.

Application secured by Spring Security. Using custom trivial token implementation for access application api and session managment to collect user data.

Spring Social used for imlement social sign up and sign in (in this project Spring social works only with facebook users).

User can choose sign up by social servics or by login form.

Spring Data used to creat entities repository (DAO layer). All entities except user files use Spring repositories. Users files stored by server as a common file only it's location at server writing to data base. User file binding to task and only user that can see this task can download file.

Any files, that uploaded by users storing only for 30 days. File cleaner running asycnroniusly in separate thread, it sleeps for 30 days.

# Client
Client developed by Angular2 TypeScript. It using JSON objects to communicate with server.

# DBMS 
PostgresQL
