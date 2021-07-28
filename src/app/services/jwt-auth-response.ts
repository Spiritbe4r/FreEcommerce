export class JwtAuthResponse{
    username: String;
    token:string;
    

    constructor(username:string,token:string){
        this.username=username;
        this.token=token;

    }
}