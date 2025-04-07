import {rateLimit} from "express-rate-limit"


export const limiter = rateLimit({
    windowMs:60*60000,
    limit:5,
    message:{"error":"Has alcanzado el limite de peticiones"}
})