import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lop } from 'src/app/models/lop';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
  @Input() lop: Lop;
  student: Student = new Student();

  constructor(private modalCtr: ModalController,
    private studentService: StudentService) {
    }

  ngOnInit() {
    this.student.diemtb = 0;
  }

  async dismiss() {
    await this.modalCtr.dismiss();
  }

  async addStudent() {
    this.student.masv = this.lop.maLop + this.student.masv;
    this.studentService.addStudent(this.lop.maLop, this.student).subscribe(
      async (student) => await this.modalCtr.dismiss(student)
    );
  }

  thayDoiDiemtb(event: any) {
    this.student.diemtb = event.detail.value / 10;
  }

}
