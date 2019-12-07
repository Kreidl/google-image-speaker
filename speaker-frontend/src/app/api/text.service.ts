import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_PATH }  from '../../variables';
import { Configuration } from '../../configuration';
import { CustomHttpUrlEncodingCodec } from '../../encoder';
import { Helper } from '../model/models';


@Injectable()
export class TextService {


  protected basePath = 'http://api/text';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

      this.configuration.basePath = basePath;
  }

  /**
   * Send Text
   *
   * @param text Source
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
 public sendText(text: Helper, observe?: 'body', reportProgress?: boolean): Observable<any>;
 public sendText(text: Helper, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
 public sendText(text: Helper, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
 public sendText(text: Helper, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
    if (text === null || text === undefined) {
        throw new Error('Required parameter schema was null or undefined when calling sendText.');
    }

    let headers = this.defaultHeaders;

    // to determine the Content-Type header
    const consumes: string[] = [
        'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
        headers = headers.set('Content-Type', 'application/json');
    }


    return this.httpClient.post<any>(`${this.configuration.basePath}/api/text`,
        text,
        {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        }
    );
  }

}
