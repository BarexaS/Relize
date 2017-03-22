import {ITodo} from "../todo/todo.model";
export interface ITask extends ITodo{
    id: number;
    title : string;
    date : string;
    text : string;
    done : boolean;
    groupId:number;
    fileId:number;
    fileName:string;
}


export class Task implements ITask{
    id: number;
    title : string;
    date:string;
    text : string;
    done:boolean;
    groupId:number;
    fileId:number;
    fileName:string;

    constructor(title:string,date:string, text :string, groupId:number){
        this.title = title;
        this.done = false;
        this.text = text;
        this.date = date;
        this.id = 0;
        this.groupId = groupId;
    }
}