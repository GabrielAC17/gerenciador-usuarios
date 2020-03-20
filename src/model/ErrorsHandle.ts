import { ErrorHandle, ErrorHandleDafault, BusinessError, SystemError, ErrorResponse } from "@roit/roit-response-handler";
 
export class ErrorsHandle {
 
    // /** 
    //  * 1. The decorator @ErrorHandle mapping your treatment by first arg (ex: BusinessError)
    //  * 2. Communicates with Express instances
    //  * 3. Signature ->  (err: any, req: Request, res: Response, next: NextFunction)
    // */
    // @ErrorHandle
    // businessError(ex: BusinessError, req: Request, res: Response) {
    //   // your log
    //   res.status(400).send(ErrorResponse(ex.message))
    // }
 
    // @ErrorHandle
    // systemError(ex: SystemError, req: Request, res: Response) {
    //   // your log
    //   res.status(500).send(ErrorResponse(ex.message))
    // }
 
    // /** 
    //  * 1. The decorator @ErrorHandleDafault is execute while the Error not mapping
    //  * 2. Communicates with Express instances
    //  * 3. Signature ->  (err: any, req: Request, res: Response, next: NextFunction)
    //  * 4. If not mapped internal treatment is performed
    // */
    // @ErrorHandleDafault
    // default(ex: Error, req: Request, res: Response) {
    //    // your log 
    //   res.status(400).send(ErrorResponse("Error not mapping"))
    // }
 
}