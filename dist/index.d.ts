import { Request, Response, NextFunction } from 'express';
export declare const requestModifier: (request: Request, _response: Response, next: NextFunction) => void;
export declare const responseModifier: import("express").RequestHandler;
