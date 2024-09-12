import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  form!: FormGroup;
  qrCodeDataUrl: SafeUrl | null = null; // Para almacenar la URL de datos de la imagen QR
  qrCodeBase64: string | null = null;

  // readonly emailForm = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');
  
  submitted = false;

  constructor(private fb: FormBuilder, 
    private backendService: BackendService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
    
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      docType: ['',[Validators.required]],
      docNumber: ['',[Validators.required,Validators.pattern("^[0-9]{6,15}")]],
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]{7,10}")]],
      address: ['',[Validators.required]],
      photo: [''],
      dependers: this.fb.array([])
    });
  }

  get dependers(): FormArray {
    return this.form.get('dependers') as FormArray;
  }

  createDepender(): FormGroup {
    return this.fb.group({
      docType: ['',[Validators.required]],
      docNumber: ['',[Validators.required,Validators.pattern("^[0-9]{6,15}")]],
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]{7,10}")]]
    });
  }

  addDepender(): void {
    this.dependers.push(this.createDepender());
  }

  removeDepender(index: number): void {
    this.dependers.removeAt(index);
  }

  saveTutorial(): void {
    this.backendService.create(this.form.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.qrCodeDataUrl = this.sanitizer.bypassSecurityTrustUrl(res);
          this.qrCodeBase64 = res;
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      this.router.navigate(['/lista']);
  }
  
  downloadQR(): void {
    if (this.qrCodeBase64) {
      const link = document.createElement('a');
      link.href = this.qrCodeBase64;
      link.download = 'qrcode.png';
      link.click();
    }
  }
  

}