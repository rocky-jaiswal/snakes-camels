import bodyParser from 'body-parser'
import Request from 'supertest'
import express, { Request as Req, Response } from 'express'

import { requestModifier, responseModifier } from '../src'

describe('request modifications', () => {

  let app: any = null

  beforeAll(() => {
    app = express()

    app.use(bodyParser.json())
    app.use(requestModifier)
    app.use(responseModifier)

    app.post('/test', (req: Req, res: Response) => {
      res.status(200).json({ helloTo: req.body.someName })
    })

    app.put('/test2', (req: Req, res: Response) => {
      if (req.body.someData.isTrue) {
        res.status(200).json({ theResult: req.body.num1 + req.body.num2 })
      }
    })
  })

  test('POST - body is modified', async () => {
    await Request(app)
      .post('/test')
      .send({ some_name: 'the world' })
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res: any) => expect(res.body).toEqual({ hello_to: 'the world' }))
  })

  test('PUT - body is modified', async () => {
    const payload = {
      num_1: 23,
      num_2: 23,
      some_data: {
        is_true: true
      }
    }
    await Request(app)
      .put('/test2')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res: any) => expect(res.body).toEqual({ the_result: 46 }))
  })
})
