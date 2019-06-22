import * as humps from 'humps'
import mung from 'express-mung'
import { Request, Response, NextFunction } from 'express'

export const requestModifier = (request: Request, _response: Response, next: NextFunction) => {
  request.params = humps.camelizeKeys(request.params)
  request.body = humps.camelizeKeys(request.body)
  next()
}

const responseModifierAction = (body: any, _request: Request, _response: Response) => {
  return humps.decamelizeKeys(body)
}

export const responseModifier = mung.json(responseModifierAction)
