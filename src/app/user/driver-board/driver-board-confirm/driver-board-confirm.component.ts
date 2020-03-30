import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-driver-board-confirm',
  templateUrl: './driver-board-confirm.component.html',
  styleUrls: ['./driver-board-confirm.component.scss']
})
export class DriverBoardConfirmComponent implements OnInit {
  confirmForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DriverBoardConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.createForm();
   }

  ngOnInit() {
  }

  private createForm() {
    this.confirmForm = this.fb.group({
      driver_comments: ''
    });
  }

  onSubmit(id: string, state: boolean) {
    const driver_comments = this.confirmForm.value.driver_comments;
    this.dialogRef.close({id, driver_comments, state});
  }

  onDismiss() {
    this.dialogRef.close();
  }

}
