import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FutureTrip } from 'src/app/shared/entity.interface';

@Component({
  selector: 'app-pass-board-reserve',
  templateUrl: './pass-board-reserve.component.html',
  styleUrls: ['./pass-board-reserve.component.scss']
})
export class PassBoardReserveComponent implements OnInit {
  reservePlaceForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<PassBoardReserveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder,
    ) { 
      dialogRef.disableClose = true;
      this.createForm();
    }

  ngOnInit() {
  }

  private createForm() {
    this.reservePlaceForm = this.fb.group({
      places_number: [null, Validators.required],
      passenger_comments: ''
    });
  }

  onSubmit(id: string) {
    const places_number = this.reservePlaceForm.value.places_number[0];
    const passenger_comments = this.reservePlaceForm.value.passenger_comments;
    this.dialogRef.close({id, places_number, passenger_comments});
  }

  onDismiss() {
    this.dialogRef.close();
  }

  convertToArray(value: number): Number[] {
    const result: Number[] = []
    for (let i = 1; i <= value; i++) {
      result.push(i);
    }
    return result;
  }
}
