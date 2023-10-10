import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionStorage, SessionStorageService } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class TrylinksService {
  static headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  static serverURL = environment.serviceUrl;
  static serverAddr = TrylinksService.serverURL + ':5000';
  @SessionStorage() username = 'unknown user';
  @SessionStorage() lastTutorialId: number = null;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  signup(username: string, email: string, password: string) {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/user/signup',
        {
          username,
          email,
          password
        },
        {
          headers: TrylinksService.headers,
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Signup API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/user/login',
        {
          username,
          password
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.username = username;
            this.lastTutorialId = response.body.data.last_tutorial;
          }
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Login API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  logout(): Observable<boolean> {
    return this.http
      .get(TrylinksService.serverAddr + '/api/logout', {
        headers: TrylinksService.headers,
        observe: 'response',
        withCredentials: true
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.sessionStorageService.clear('all'); // removes all session storage data
          }
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Login API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  startInteractiveMode(): Observable<string> {
    return this.http
      .get(TrylinksService.serverAddr + '/api/initInteractive', {
        headers: TrylinksService.headers,
        observe: 'response',
        withCredentials: true
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.path;
          }
          return '';
        }),
        catchError(error => {
          console.log(`InteractiveUrl API failed with the following detail:\n`);
          console.log(error);
          return of('');
        })
      );
  }

  compileAndDeploy(): Observable<string> {
    return this.http
      .get(TrylinksService.serverAddr + '/api/compile', {
        headers: TrylinksService.headers,
        observe: 'response',
        withCredentials: true
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.path;
          }
          return '';
        }),
        catchError(error => {
          console.log(
            `compileAndDeploy API failed with the following detail:\n`
          );
          console.log(error);
          return of('');
        })
      );
  }

  getTutorialSource(id: number): Observable<string> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/file/read',
        {
          tutorial: id
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.fileData;
          }
          return '';
        }),
        catchError(error => {
          console.log(`File Read API failed:\n`);
          console.log(error);
          return of('');
        })
      );
  }

  saveTutorialSource(id: number, source: string): Observable<boolean> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/file/write',
        {
          tutorial: id,
          fileData: source
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`File Read API failed:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  getTutorialDesc(id: number): Observable<string> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/tutorial/description',
        {
          tutorialId: id
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.description;
          }
          return '';
        }),
        catchError(error => {
          console.log(`Tutorial Read API failed:\n`);
          console.log(error);
          return of('');
        })
      );
  }

  createTutorial(
    title: string,
    description: string,
    source: string
  ): Observable<boolean> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/tutorial/create',
        {
          title,
          description,
          source
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Tutorial Create API failed:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  getTutorialHeaders(): Observable<Array<string>> {
    return this.http
      .get(TrylinksService.serverAddr + '/api/tutorial/headers', {
        headers: TrylinksService.headers,
        observe: 'response',
        withCredentials: true
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.headers;
          }
          return [];
        }),
        catchError(error => {
          console.log(`Retrieval of tutorial titles failed:\n`);
          console.log(error);
          return of([]);
        })
      );
  }

  getDefaultTutorialId(): Observable<number> {
    return this.http
      .get(TrylinksService.serverAddr + '/api/tutorial/defaultId', {
        headers: TrylinksService.headers,
        observe: 'response',
        withCredentials: true
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.tutorialId;
          }
          return 0;
        }),
        catchError(error => {
          console.log(`Retrieval of tutorial titles failed:\n`);
          console.log(error);
          return of(0);
        })
      );
  }

  updateUser(lastTutorial: number): Observable<boolean> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/user/update',
        {
          last_tutorial: lastTutorial,
          password: null
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.lastTutorialId = response.body.data.last_tutorial;
          }
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Update User API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }
}
