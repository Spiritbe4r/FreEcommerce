import { stringify } from "querystring";


export class JwtAuthResponse{

    token:string;
    user:MyUser;
    
    

    constructor(token:string,user:MyUser){
   
        this.token=token;
        this.user=user;
     

    }
}

export class MyUser{
    username:string;
    email:string;
    name:string;
    roles:string;
    img:string;

    constructor(username:string,email:string,name:string,roles:string,img:string){
        this.username=username;
        this.email=email;
        this.name=name;
        this.roles=roles;
        this.img=img;

    }

}
