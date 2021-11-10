import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { PopoverController, AlertController } from '@ionic/angular';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.page.html',
  styleUrls: ['./info-student.page.scss'],
})
export class InfoStudentPage implements OnInit {
  @Input() student: Student;
  newStudent: Student;

  constructor(private popover: PopoverController,
    private alertCtrl: AlertController,
    private studentService: StudentService) { }

  ngOnInit() {
    this.newStudent = Object.assign({}, this.student);
  }

  dismiss() {
    this.popover.dismiss();
  }

  async updateStudent() {
    const alert = this.alertCtrl.create({
      message: "Bạn có chắc chắn muốn cập nhật sinh viên " + this.student.hoTen + " hay không?",
      buttons: [
        {
          text: "Không",
          role: "cancel"
        },
        {
          text: "Có",
          role: "ok",
          handler: () => {
            this.student.hoTen = this.newStudent.hoTen;
            this.student.ngaySinh = this.newStudent.ngaySinh;
            this.student.gioiTinh = this.newStudent.gioiTinh;
            this.student.diemtb = this.newStudent.diemtb;

            this.studentService.updateStudent(this.student.masv, this.student).subscribe(
              () => this.popover.dismiss(this.student)
            );
          }
        }
      ]
    });
    return (await alert).present();
  }

  thayDoiNgaySinh(event: any) {
    this.newStudent.ngaySinh = new Date(event.detail.value);
  }

  thayDoiGioiTinh(event: any) {
    this.newStudent.gioiTinh = event.detail.value;
  }

  thayDoiDiemtb(event: any) {
    this.newStudent.diemtb = event.detail.value / 10;
  }

}
