import { ResponseError } from "../errors/response-error.js"

const validation = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false
    })
    
    if (result.error) {
        // console.log("error");
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value
    }
}

export {
    validation
}