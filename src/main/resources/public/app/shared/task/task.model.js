"use strict";
var Task = (function () {
    function Task(title, date, text, groupId) {
        this.title = title;
        this.done = false;
        this.text = text;
        this.date = date;
        this.id = 0;
        this.groupId = groupId;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.model.js.map