export class Group {
    id: number;
    name : string;
    users: string[];
    ownerFlag : boolean;

    constructor(name:string){
        this.id = 0;
        this.name = name;
        this.users = [];
        this.ownerFlag = true;
    }
}
