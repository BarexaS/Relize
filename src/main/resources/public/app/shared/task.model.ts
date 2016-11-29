import {ITodo} from "./todo.model";
export interface ITask extends ITodo{
    id: number;
    title : string;
    date : string;
    text : string;
    done : boolean;
}


export class Task implements ITask{
    id: number;
    title : string;
    date:string;
    text : string;
    done:boolean;

    constructor(title:string,date:string, text :string){
        this.title = title;
        this.done = false;
        this.text = text;
        this.date = date;
        this.id = 0;
    }
}