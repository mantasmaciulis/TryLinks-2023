import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrylinksService {
  static headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  static serverAddr = environment.serviceUrl;

  constructor(private http: HttpClient) {
    if (!sessionStorage.getItem('username')) {
      sessionStorage.setItem('username', 'unknown user');
    }
    if (!sessionStorage.getItem('lastTutorialId')) {
      sessionStorage.setItem('lastTutorialId', null);
    }
  }

  get username(): string {
    return sessionStorage.getItem('username');
  }

  set username(value: string) {
    sessionStorage.setItem('username', value);
  }

  get lastTutorialId(): number {
    return +sessionStorage.getItem('lastTutorialId');
  }

  set lastTutorialId(value: number) {
    sessionStorage.setItem('lastTutorialId', value.toString());
  }

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
          withCredentials: true,
          observe: 'response'
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
      );}

  login(username: string, password: string): Observable<boolean> {
    const loginData = {
      username: username,
      password: password
    };
  
    return this.http
      .post(TrylinksService.serverAddr + '/api/user/login', loginData, {
        headers: TrylinksService.headers,
        observe: 'response',
        withCredentials: true
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200 && response.body.data) {
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
            sessionStorage.clear(); // removes all session storage data
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
