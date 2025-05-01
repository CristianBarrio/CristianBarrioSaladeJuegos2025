import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
}

@Component({
  selector: 'app-quiensoy',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiensoy.component.html',
  styleUrl: './quiensoy.component.css'
})
export class QuiensoyComponent {
  user?: GithubUser;
  error: string = '';

  constructor(private http: HttpClient) {
    this.fetchUser();
  }

  fetchUser() {
    const url = `https://api.github.com/users/CristianBarrio`;
    this.http.get<GithubUser>(url).subscribe({
      next: (data) => {
        this.user = data;
        this.error = '';
      },
      error: () => {
        this.user = undefined;
        this.error = 'User not found or an error occurred.';
      }
    });
  }
}
