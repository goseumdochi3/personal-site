import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'An unexpected error occurred',
  })
}

export default errorHandler
