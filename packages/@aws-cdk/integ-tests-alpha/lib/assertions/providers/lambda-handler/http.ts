/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch, { Response } from 'node-fetch';
// TODO: can use builtin fetch on node18
import { CustomResourceHandler } from './base';
import { HttpRequest, HttpResponseWrapper } from './types';

export class HttpHandler extends CustomResourceHandler<HttpRequest, HttpResponseWrapper> {
  protected async processEvent(request: HttpRequest): Promise<HttpResponseWrapper> {
    console.log('request', request);
    const response: Response = await fetch(request.parameters.url, request.parameters.fetchOptions);
    const result: any = {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers.raw(),
    };
    try {
      const jsonResponse = await response.json();
      result.body = jsonResponse;
    } catch (e) {
      result.body = {};
    }
    return {
      apiCallResponse: result,
    };
  }
}
