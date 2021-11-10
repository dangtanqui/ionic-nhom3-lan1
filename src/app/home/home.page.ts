import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Lop } from '../models/lop';
import { LopService } from '../services/lop.service';
import { AddLopPage } from '../pages/add-lop/add-lop.page';
import { UpdateLopPage } from '../pages/update-lop/update-lop.page';
import { AddStudentPage } from '../pages/add-student/add-student.page';
import { Student } from '../models/student';
import { InfoStudentPage } from '../pages/info-student/info-student.page';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lops: Lop[];

  constructor(private lopService: LopService,
    private studentService: StudentService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) {
    }

  ngOnInit() {
    this.getLops();
  }
  
  getLops() {
    this.lopService.getLops().subscribe(
      lops => {
        this.lops = lops;
      }
    );
  }

  async addLop() {
    const modal = await this.modalCtrl.create({
      component: AddLopPage
    });

    modal.onDidDismiss().then(
      lop => {
        this.getLops();
        if (typeof lop.data !== "undefined") {
          this.showMessage("Thêm lớp thành công");
        }
      }
    );

    return await modal.present();
  }
  
  async updateLop(lopUpdate: Lop) {
    const modal = await this.modalCtrl.create({
      component: UpdateLopPage,
      componentProps: {
        lop: lopUpdate
      }
    });

    modal.onDidDismiss().then(
      lop => {
        this.getLops();
        if (typeof lop.data !== "undefined") {
          this.showMessage("Cập nhật lớp thành công");
        }
      }
    );

    return await modal.present();
  }

  async deleteLop(lopDelete: Lop) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Xóa lớp " + lopDelete.tenLop,
      subHeader: "Bạn có chắc chắn muốn xóa lớp này hay không?",
      buttons: [
        {
          text: "Không",
          role: "cancel",
        },
        {
          text: "Xóa",
          role: "ok",
          handler: () => {
            this.lopService.deleteLop(lopDelete).subscribe(
              () => {
                this.getLops();
                this.showMessage("Xóa lớp thành công");
              }
            );
          }
        }
      ]
    });

    return await actionSheet.present();
  }

  async addStudent(lopAddStudent: Lop) {
    const modal = await this.modalCtrl.create({
      component: AddStudentPage,
      componentProps: {
        lop: lopAddStudent
      }
    });

    modal.onDidDismiss().then(
      student => {
        this.getLops();
        if (typeof student.data !== "undefined") {
          this.showMessage("Thêm sinh viên thành công")
        }
      }
    );

    return await modal.present();
  }

  async deleteStudent(lopDeleteStudent: Lop, studentDelete: Student) {
    const alert = await this.alertCtrl.create({
      message: "Bạn có chắc chắn muốn xóa sinh viên " + studentDelete.hoTen + " thuộc lớp " + lopDeleteStudent.tenLop,
      buttons: [
        {
          text: "Không",
          role: "cancel",
        },
        {
          text: "Xóa",
          role: "ok",
          handler: () => {
            this.studentService.deleteStudent(studentDelete.masv).subscribe(
              () => {
                this.getLops();
                this.showMessage("Xóa sinh viên thành công");
              }
            );
          }
        }
      ]
    });

    return await alert.present();
  }

  async showInfoStudent(event: any, studentInfo: Student) {
    const popover = await this.popoverCtrl.create({
      component: InfoStudentPage,
      cssClass: "info-student",
      componentProps: {
        student: studentInfo
      },
      event: event
    });

    popover.onDidDismiss().then(
      student => {
        this.getLops()
        if (typeof student.data !== "undefined") {
          this.showMessage("Cập nhật sinh viên thành công");
        }
      }
    );

    return popover.present();
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top",
      cssClass: "message-toast",
      buttons: [
        {
          icon: "close-outline",
          role: "cancel",
          side: "end"
        }
      ]
    });

    return await toast.present();
  }

}
