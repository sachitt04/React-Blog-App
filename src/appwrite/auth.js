import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount ({email,password,name}) {
        try{
     const userAccount = await this.account
     .create(ID.unique(), email,password,name)

     if(userAccount){

        return this.login({email,password})

     } else{
        userAccount;
     }


        } catch(err){
            console.log("error ::", err)

        }
    }

    async login ({email,password}){
try {
      return await this.account.createEmailPasswordSession(
                 email,
                password
                )
} catch (err) {

    console.log("error in login section::",err)
    
    }
  }

  async getCurrentUser() {
    try{
        return await this.account.get()
    } catch(err){
        console.log("error while getting current user::",err)
    }
    return null;
  }

  async logout (){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("ERror while logging out ::",err)       
    }
  }
} 


const authService = new AuthService()


export default authService