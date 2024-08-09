import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service'; 
import { StateService } from '../../state.service'; 
import { HttpClient } from '@angular/common/http';
import { PatientListComponent } from '../patient-list/patient-list.component';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css'],
  imports: [ReactiveFormsModule, CommonModule, PatientListComponent],
  standalone: true,
  providers: [PatientService]
})
export class PatientCreateComponent implements OnInit {
  patientForm: FormGroup;
  //states: any[] = []; 
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  states:  { sigla: string, nome: string }[] = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private stateService: StateService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      altura: ['', [Validators.required, Validators.min(0)]],
      uf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStates();
    
  }

  loadStates(): void {
    this.stateService.getStates().subscribe(
      (data: any) => {
        this.states = data;
      },
      (      error: any) => {
        console.error('Erro ao carregar estados:', error);
      }
    );
  }


voltar(){
  this.router.navigate(['/patients']);
}

  onSubmit() {
    if (this.patientForm.valid) {
      this.isLoading = true;
      this.patientService.createPatient(this.patientForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Cadastrado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/patients']);
          }, 2000); 
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao cadastrar paciente';
          console.error('Erro ao cadastrar paciente', error);
        }
      });
    }
  }

}
