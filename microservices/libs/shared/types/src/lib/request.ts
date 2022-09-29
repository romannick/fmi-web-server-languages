import * as core from 'express-serve-static-core'

export type Request<ReqBody> = core.Request<core.ParamsDictionary, any, ReqBody>

export type Response<ResBody> = core.Response<ResBody | BaseResponse>

export interface BaseResponse {
  success?: boolean
  message?: string
}

export const successResponse: BaseResponse = { success: true }
