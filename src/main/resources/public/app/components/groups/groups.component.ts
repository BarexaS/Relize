import {Component, OnInit} from "@angular/core";
import {Group} from "../../shared/group/group.model";
import {GroupService} from "../../shared/group/group.service";
import {TaskService} from "../../shared/task/task.service";
declare var $: any;

@Component({
    selector: 'groups',
    templateUrl: './app/components/groups/groups.component.html',
    styleUrls: ['./app/components/groups/groups.components.css']
})
export class GroupsComponent implements OnInit {
    groups: Group[];
    groupsInv: Group[];
    groupService: GroupService;
    groupVision: boolean;
    taskService: TaskService;
    constructor(groupService: GroupService, taskService: TaskService) {
        this.groups = [];
        this.groupsInv = [];
        this.groupService = groupService;
        this.groupVision = true;
        this.taskService = taskService;
    }

    ngOnInit(){
        this.groupService.getGroups().subscribe(
            data => this.groups = data
        )
        this.groupService.getGroupsInvites().subscribe(
            data => this.groupsInv = data
        )
    }

    addGroup(groupName:string){
        this.groupService.addGroup(new Group(groupName)).subscribe(data => this.groups.push(data));
    }

    leaveGroup(group:Group){
        this.groupService.leaveGroup(group).subscribe(data => {});
        this.deleteGroup(group, this.groups);
    }

    inviteUser(login:string, groupId:number){
        this.groupService.invite(login,groupId).subscribe(data => {});
    }

    acceptInv(group:Group){
        this.groupService.acceptInv(group).subscribe(data => {});
        this.groups.push(group);
        this.deleteGroup(group, this.groupsInv);
    }

    removeInv(group:Group){
        this.groupService.removeInv(group).subscribe(data => {});
        this.deleteGroup(group, this.groupsInv);
    }

    toggleVision(flag:boolean){
        this.groupVision = flag;
    }

    private deleteGroup(group:Group, target:Group[]): void {
        let index = target.indexOf(group);
        if (index > -1) {
            target.splice(index, 1);
        }
    }

    get sortedGroups(): Group[]{
        return this.groups
        // Создаем "копию" массива
            .map(group => group)
            // Сортитуем массив по названию
            .sort((a,b) => {
                if (a.name > b.name) return 1;
                else if (a.name < b.name) return -1;
                else return 0;
            })
    }
}