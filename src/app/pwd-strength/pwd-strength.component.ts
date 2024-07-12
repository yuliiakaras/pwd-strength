import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-pwd-strength',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './pwd-strength.component.html',
  styleUrl: './pwd-strength.component.scss'
})
export class PwdStrengthComponent implements OnInit {
  passwordControl = new FormControl('');
  strength: string = '';

  ngOnInit() {
    
  }
}
