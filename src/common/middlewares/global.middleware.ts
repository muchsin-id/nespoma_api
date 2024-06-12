import { Request, Response, NextFunction } from 'express';

const setAuditTrail = (req: Request) => {
  Object.assign(req.body, {
    updated_at: new Date(),
  });
};

export function globalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  setAuditTrail(req);

  next();
}
