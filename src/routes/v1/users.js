import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(StatusCodes.OK).json({
        message: "Get all the user data"
    })
})


export default router;