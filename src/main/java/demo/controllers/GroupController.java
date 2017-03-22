package demo.controllers;

import demo.app.DTO.GroupDTO;
import demo.app.entities.CustomUser;
import demo.app.entities.Group;
import demo.services.groups.GroupService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
public class GroupController {
    @Autowired
    private UserService userService;

    @Autowired
    private GroupService groupService;

    @RequestMapping(value = "/api/groups", method = RequestMethod.GET)
    public GroupDTO[] getUsersGroups(Principal principal) {
        CustomUser owner = userService.getUserByLogin(principal.getName());
        GroupDTO[] result = owner.getGroups().stream().map(GroupDTO::creatDTO).toArray(GroupDTO[]::new);
        return result;
    }


    @RequestMapping(value = "/api/groups", method = RequestMethod.POST)
    public GroupDTO addGroup(Principal principal, @RequestBody GroupDTO groupDTO) {
        CustomUser owner = userService.getUserByLogin(principal.getName());
        Group newGroup = new Group(groupDTO.getName(), owner);
        newGroup.addUser(owner);
        newGroup = groupService.addGroup(newGroup);
        return GroupDTO.creatDTO(newGroup);
    }

    @RequestMapping(value = "/api/groups/{group_id}", method = RequestMethod.DELETE)
    public void leaveGroup(Principal principal, @PathVariable(value = "group_id") long id) {
        CustomUser user = userService.getUserByLogin(principal.getName());
        Optional<Group> group = user.getGroups().stream().filter(g -> g.getId() == id).findFirst();
        if (group.isPresent()) {
            user.leaveGroup(group.get());
            groupService.saveGroup(group.get());
        }
    }

    @RequestMapping(value = "/api/groups/{group_id}", method = RequestMethod.PUT)
    public void inviteToGroup(@PathVariable(value = "group_id") long id, @RequestParam(name = "login") String login){
        CustomUser user = userService.getUserByLogin(login);
        if (user != null){
            Group group = groupService.getGroup(id);
            user.addInvite(group);
            userService.updateUser(user);
        }
    }

    @RequestMapping(value = "/api/groups/inv", method = RequestMethod.GET)
    public GroupDTO[] getUsersGroupsInvites(Principal principal) {
        CustomUser owner = userService.getUserByLogin(principal.getName());
        GroupDTO[] result = owner.getInvites().stream().map(GroupDTO::creatDTO).toArray(GroupDTO[]::new);
        return result;
    }

    @RequestMapping(value = "/api/groups/inv", method = RequestMethod.PUT)
    public void acceptInvite(Principal principal, @RequestParam(name = "groupId")long id) {
        System.out.println("test");
        CustomUser user = userService.getUserByLogin(principal.getName());
        user.acceptInvite(id);
        userService.updateUser(user);
    }

    @RequestMapping(value = "/api/groups/inv/{group_id}", method = RequestMethod.DELETE)
    public void removeInv(Principal principal, @PathVariable(value = "group_id") long id) {
        CustomUser user = userService.getUserByLogin(principal.getName());
        Optional<Group> group = user.getInvites().stream().filter(g -> g.getId() == id).findFirst();
        if (group.isPresent()) {
            user.removeInvite(group.get().getId());
            userService.updateUser(user);
        }
    }
}
