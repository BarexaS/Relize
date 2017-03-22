"use strict";
var Todo = (function () {
    function Todo(title, text) {
        this.title = title;
        this.done = false;
        this.text = text;
        this.id = 0;
    }
    return Todo;
}());
exports.Todo = Todo;
//# sourceMappingURL=todo.model.js.map