import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { passwordStrengthValidator } from '../utils/pwdStrength.validator';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pwd-strength',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './pwd-strength.component.html',
  styleUrl: './pwd-strength.component.scss'
})
export class PwdStrengthComponent implements OnInit, OnDestroy {
  private untilSubject$: Subject<void> = new Subject<void>();

  passwordControl = new FormControl('', [passwordStrengthValidator()]);
  strength: string = ''; 
  strengthBars = [0, 1, 2]; 

  ngOnInit() {
    this.passwordControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.untilSubject$)
      )
      .subscribe(() => this.updateStrength());
  }

  updateStrength(): void {
    const errors: ValidationErrors | null = this.passwordControl.errors;
    if (errors) {
      this.strength = errors['strength'];
    } else {
      this.strength = '';
    }
  }

  ngOnDestroy(): void {
    this.untilSubject$.next();
    this.untilSubject$.complete();
  }
}
