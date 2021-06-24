import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:8005/api/systemusers'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<{ results: User[], totalCount: number }>(this.url)
  }

  getSingleUser(id: string) {
    return this.http.get<User>(`${this.url}/${id}`)
  }

  createUser(resource: User) {
    return this.http.post<User>(this.url, resource)
  }

  updateUser(resource: User) {
    return this.http.put<User>(`${this.url}/${resource.id}`, resource)
  }

  deleteUser(id: string) {
    return this.http.delete<User>(`${this.url}/${id}`)
  }

}