import { Response } from "express";

const ResponseHandler = (res:Response,success:boolean,statusCode:number,message:string,data?:any) => {
    const response = {
        success,
        statusCode,
        message,
        data
    }

    return res.status(statusCode).json(response)
}

export default ResponseHandler;