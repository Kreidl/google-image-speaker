import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_PATH }  from '../../variables';
import { Configuration } from '../../configuration';
import { CustomHttpUrlEncodingCodec } from '../../encoder';
import { Helper } from '../model/models';

@Injectable()
export class ImageService {


  protected basePath = 'http://api/image';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

      this.configuration.basePath = basePath;
  }

  /**
   * Send Image
   *
   * @param baseString Source
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
 public sendImage(baseString: Helper, observe?: 'body', reportProgress?: boolean): Observable<any>;
 public sendImage(baseString: Helper, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
 public sendImage(baseString: Helper, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
 public sendImage(baseString: Helper, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
    if (baseString === null || baseString === undefined) {
        throw new Error('Required parameter schema was null or undefined when calling sendImage.');
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

    return this.httpClient.post<any>(`${this.configuration.basePath}/api/image`,
        baseString,
        {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        }
    );
  }

}
