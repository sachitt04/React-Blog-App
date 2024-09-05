import { comment } from "postcss";
import config from "../config/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export  class Service{
    client = new Client()
    Databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.Databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.Databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
                ,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {

            console.log("APPWrite error :: cratepost ::", error)
            
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await  this.Databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            ) 
        } catch (err) {
            console.log("APPWRITE ERROR :: UpdatePost ERROR ::",err)

            
        }
    }

    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (err) {

            console.log("APPWRITE Error :: DElete post ::",err)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.Databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (err) {
            
            console.log("appwrite error :: getpost:: ",err)
        }
    }

    async getPosts(qureis=[Query.equal("staus","active")]){
        try {
            return await this.Databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                qureis
            )
        } catch (err) {
            console.log("appwrite error :: error while getting posts ::" ,err)
            
        }
    }
// file upload serviece
async uplodFile(file){
    try {
        return await this.storage.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwrite error :: error while uploading file ::" ,error)
        return  false
    }
}

async deleteFile(fileId){
    try {
        await this.storage.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {

        console.log("appwrite error ::error while deleting file::", error)
        
    }
}

getFilePreview(fileId){
    return this.storage.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}

}

const service = new Service()

export default service