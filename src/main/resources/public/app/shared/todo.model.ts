export interface ITodo {
    id: number;
    title : string;
    text : string;
    done : boolean;
}


export class Todo implements ITodo{
    id: number;
    title : string;
    text : string;
    done:boolean;

    constructor(title:string, text :string){
        this.title = title;
        this.done = false;
        this.text = text;
        this.id = 0;
    }
}