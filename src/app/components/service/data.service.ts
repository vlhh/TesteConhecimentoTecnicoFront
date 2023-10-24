import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DadosRetornoModel} from "../model/dados-retorno.model";
import {DadosJsonModel} from "../model/dados-json.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.GATEWAY + '/api/dados'; // Substitua pelo URL do seu backend

  constructor(private http: HttpClient) {
  }

  postJson(json: DadosJsonModel): Observable<DadosRetornoModel> {
    const url = `${this.baseUrl}/json`; // Substitua 'dados' pelo endpoint correto
    return this.http.post<DadosRetornoModel>(url, json);
  }
}
