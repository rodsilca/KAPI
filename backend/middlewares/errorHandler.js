export const errorHandler = (err,req,res,next) =>{
    console.error("error captured: ", err);

    if(err.isJoi){
        return res.status(400).json({
            message: "Validation error",
            details: err.details.map(x => x.message)
        });
    }

    if(err.statusCode){
        return res.status(err.statusCode).json({
            message: err.message || "Unexpected error"
        });
    }

    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
}