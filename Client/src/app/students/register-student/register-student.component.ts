import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { StudentService } from '../../_services/student.service';
import { StudentRegistrationDto } from '../../_interfaces/student-registration-dto';
import { NgIf } from '@angular/common';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { DatePickerComponent } from '../../_forms/date-picker/date-picker.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { NextButtonComponent } from '../../shared/next-button/next-button.component';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { HeadingComponent } from '../../shared/heading/heading.component';
import { RadioInputComponent } from '../../_forms/radio-input/radio-input.component';

@Component({
  selector: 'app-register-student',
  imports: [
    NgIf,
    ReactiveFormsModule,
    TextInputComponent,
    DatePickerComponent,
    BackButtonComponent,
    NextButtonComponent,
    SubmitButtonComponent,
    StepProgressComponent,
    HeadingComponent,
    RadioInputComponent
  ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css',
})
export class RegisterStudentComponent implements OnInit {
  isShadowEnabled = true;
  dynamicTitleClass = 'text-success';
  subClassObject = { 'heading-sub': true, 'text-muted': false };
  private formBuilder = inject(FormBuilder);
  private studentService = inject(StudentService);
  step: number = 1;
  currentStep = signal(1);
  steps: string[] = [
    'Student Info',
    'Student Address',
    'Guardian Info',
    'Guardian Address',
  ];
  completedSteps = signal([false, false, false, false]);

  sameAddress = false;
  studentMinAge = new Date();
  maxAge = new Date();
  guardianMinAge = new Date();

  ngOnInit(): void {
    this.intialiseForms();
    this.studentMinAge.setFullYear(this.studentMinAge.getFullYear() - 3);
    this.guardianMinAge.setFullYear(this.guardianMinAge.getFullYear() - 18);
    this.maxAge.setFullYear(this.maxAge.getFullYear() - 100);

    //To Updated completedSteps signal list

    this.studentForm.statusChanges.subscribe(() => this.updateCompletedSteps());
    this.studentAddressForm.statusChanges.subscribe(() =>
      this.updateCompletedSteps()
    );
    this.guardianForm.statusChanges.subscribe(() =>
      this.updateCompletedSteps()
    );
    this.guardianAddressForm.statusChanges.subscribe(() =>
      this.updateCompletedSteps()
    );
  }
  next() {
    this.step++;
    if (this.currentStep() < 4) this.currentStep.update((v) => v + 1);
  }
  back() {
    this.step--;
    if (this.currentStep() > 1) this.currentStep.update((v) => v - 1);
  }
  updateCompletedSteps() {
    this.completedSteps.set([
      this.studentForm.valid,
      this.studentAddressForm.valid,
      this.guardianForm.valid,
      this.guardianAddressForm.valid,
    ]);
  }

  studentForm: FormGroup = new FormGroup({});
  studentAddressForm: FormGroup = new FormGroup({});
  guardianForm: FormGroup = new FormGroup({});
  guardianAddressForm: FormGroup = new FormGroup({});
  intialiseForms() {
    //Step 1: Student Info
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: [''],
      lastName: ['', Validators.required],
      identityNumber: ['', Validators.required],
      gender: ['', Validators.required],
      email: [''],
      phone: [''],
      dateOfBirth: ['', Validators.required],
    });
    //Step 2: Student Address
    this.studentAddressForm = this.formBuilder.group({
      street: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      province: [''],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
    //Step 3: Guardian Info
    this.guardianForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      identityNumber: ['', Validators.required],
      relationship: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
    //Step 4: Guardian Address
    this.guardianAddressForm = this.formBuilder.group({
      street: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      province: [''],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  toggleSameAddress(event: any) {
    this.sameAddress = event.target.checked;
    if (this.sameAddress) {
      this.guardianAddressForm.patchValue(this.studentAddressForm.value);
      this.guardianAddressForm.disable();
    } else {
      this.guardianAddressForm.enable();
      this.guardianAddressForm.reset();
    }
  }

  private getDateOnly(date: string | undefined) {
    if (!date) return;
    return new Date(date).toISOString().slice(0, 10);
  }

  register() {
    const studentDateOfBirth = this.getDateOnly(
      this.studentForm.get('dateOfBirth')?.value
    );
    this.studentForm.patchValue({ dateOfBirth: studentDateOfBirth });
    const guardianDateOfBirth = this.getDateOnly(
      this.guardianForm.get('dateOfBirth')?.value
    );
    this.guardianForm.patchValue({ dateOfBirth: guardianDateOfBirth });
    const studentAddress = this.studentAddressForm.getRawValue();
    const guardianAddress = this.sameAddress
      ? studentAddress
      : this.guardianAddressForm.getRawValue();

    const payload: StudentRegistrationDto = {
      student: {
        firstName: this.studentForm.value.firstName!,
        secondName: this.studentForm.value.secondName ?? '',
        lastName: this.studentForm.value.lastName!,
        identityNumber: this.studentForm.value.identityNumber!,
        gender: this.studentForm.value.gender!,
        email: this.studentForm.value.email ?? '',
        phone: this.studentForm.value.phone ?? '',
        dateOfBirth: studentDateOfBirth ?? '',
        AddressDto: {
          street: studentAddress.street!,
          suburb: studentAddress.suburb!,
          city: studentAddress.city!,
          province: studentAddress.province ?? '',
          country: studentAddress.country!,
          postalCode: studentAddress.postalCode!,
        },
      },
      guardian: {
        firstName: this.guardianForm.value.firstName!,
        secondName: this.guardianForm.value.secondName ?? '',
        lastName: this.guardianForm.value.lastName!,
        gender: this.guardianForm.value.gender!,
        relationship: this.guardianForm.value.relationship!,
        identityNumber: this.guardianForm.value.identityNumber!,
        email: this.guardianForm.value.email ?? '',
        phone: this.guardianForm.value.phone!,
        dateOfBirth: guardianDateOfBirth ?? '',
        AddressDto: {
          street: guardianAddress.street!,
          suburb: guardianAddress.suburb!,
          city: guardianAddress.city!,
          province: guardianAddress.province ?? '',
          country: guardianAddress.country!,
          postalCode: guardianAddress.postalCode!,
        },
      },
    };
    this.studentService.registerStudent(payload).subscribe({
      next: () => alert('Sudent registerd successfully!'),
      error: (error) => {
        alert('Error: ' + error.error);
      },
    });
  }
}
