import errorResponse from "../errors/error-response.js"

const errorMiddleware = async (err, req, res, next) => {
    if(!err)  {
        next()
        return
    }
    
    if (err instanceof errorResponse) {
        res.status(err.status).json({
            error: err.message
        }).end()
    } else {
        res.status(500).json({
            error: err.message
        })
    }
}

export {
    errorMiddleware
}