import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual='';
  categoriaPage= 0 ;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = apiUrl + query ;
    return this.http.get<T>(query,{headers});
  }

  getTopHeadlines(){
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    // return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=aa96e8de93b5475b9ce198b1d5591f51`)
  }
  getTopHeadlinesCategoria(categoria: string){
    if(this.categoriaActual === categoria){
      this.headlinesPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
    // return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=aa96e8de93b5475b9ce198b1d5591f51`)
  }
}