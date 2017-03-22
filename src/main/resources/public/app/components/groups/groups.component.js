"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var group_model_1 = require("../../shared/group/group.model");
var group_service_1 = require("../../shared/group/group.service");
var task_service_1 = require("../../shared/task/task.service");
var GroupsComponent = (function () {
    function GroupsComponent(groupService, taskService) {
        this.groups = [];
        this.groupsInv = [];
        this.groupService = groupService;
        this.groupVision = true;
        this.taskService = taskService;
    }
    GroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupService.getGroups().subscribe(function (data) { return _this.groups = data; });
        this.groupService.getGroupsInvites().subscribe(function (data) { return _this.groupsInv = data; });
    };
    GroupsComponent.prototype.addGroup = function (groupName) {
        var _this = this;
        this.groupService.addGroup(new group_model_1.Group(groupName)).subscribe(function (data) { return _this.groups.push(data); });
    };
    GroupsComponent.prototype.leaveGroup = function (group) {
        this.groupService.leaveGroup(group).subscribe(function (data) { });
        this.deleteGroup(group, this.groups);
    };
    GroupsComponent.prototype.inviteUser = function (login, groupId) {
        this.groupService.invite(login, groupId).subscribe(function (data) { });
    };
    GroupsComponent.prototype.acceptInv = function (group) {
        this.groupService.acceptInv(group).subscribe(function (data) { });
        this.groups.push(group);
        this.deleteGroup(group, this.groupsInv);
    };
    GroupsComponent.prototype.removeInv = function (group) {
        this.groupService.removeInv(group).subscribe(function (data) { });
        this.deleteGroup(group, this.groupsInv);
    };
    GroupsComponent.prototype.toggleVision = function (flag) {
        this.groupVision = flag;
    };
    GroupsComponent.prototype.deleteGroup = function (group, target) {
        var index = target.indexOf(group);
        if (index > -1) {
            target.splice(index, 1);
        }
    };
    Object.defineProperty(GroupsComponent.prototype, "sortedGroups", {
        get: function () {
            return this.groups
                .map(function (group) { return group; })
                .sort(function (a, b) {
                if (a.name > b.name)
                    return 1;
                else if (a.name < b.name)
                    return -1;
                else
                    return 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    GroupsComponent = __decorate([
        core_1.Component({
            selector: 'groups',
            templateUrl: './app/components/groups/groups.component.html',
            styleUrls: ['./app/components/groups/groups.components.css']
        }), 
        __metadata('design:paramtypes', [group_service_1.GroupService, task_service_1.TaskService])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map