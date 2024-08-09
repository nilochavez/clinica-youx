import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'clinica-youx';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('angular17token');
    if (!token) {
      // Redireciona para a página de login se o token estiver vazio
      this.router.navigate(['/login']);
    }
  }
}
