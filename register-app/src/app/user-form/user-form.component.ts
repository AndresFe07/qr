import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UserService } from '../user.service';
import { User, Depender } from '../user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  form: FormGroup;  // No se inicializa a null

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      docType: [''],
      docNumber: [''],
      name: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      address: [''],
      photo: [''],
      dependers: this.fb.array([this.createDepender()])
    });
  }

  get dependers(): FormArray {
    return this.form.get('dependers') as FormArray;
  }

  createDepender(): FormGroup {
    return this.fb.group({
      princUser: [''],
      id: [''],
      docType: [''],
      docNumber: [''],
      name: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    });
  }

  addDepender(): void {
    this.dependers.push(this.createDepender());
  }

  removeDepender(index: number): void {
    this.dependers.removeAt(index);
  }

  onSubmit(): void {
    // this.qrService.submitForm(this.form.value).subscribe(response => {
    //   console.log('QR Code Response:', response);
    //   // Maneja la respuesta del código QR aquí
    // });
    console.log('QR Code Response:')
  }
}