export class RegisterPayload{
    username: String;
    email: String;
    name: String;
    roles:String;
    password: String;
   
    

    constructor(username:string,email:string,name:string,roles:string,password:string){
        this.username=username;
        this .email=email;
        this.name=name;
        this.roles=roles;
        this.password=password;

    }
}