import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lop } from 'src/app/models/lop';
import { LopService } from 'src/app/services/lop.service';

@Component({
  selector: 'app-add-lop',
  templateUrl: './add-lop.page.html',
  styleUrls: ['./add-lop.page.scss'],
})
export class AddLopPage implements OnInit {
  lop: Lop = new Lop();

  constructor(private modalCtr: ModalController,
    private lopService: LopService) {
    }

  ngOnInit() {
    this.lop.danhSachSinhVien = [];
  }

  async dismiss() {
    await this.modalCtr.dismiss();
  }

  async addLop() {
    this.lopService.addLop(this.lop).subscribe(
      async lop => await this.modalCtr.dismiss(lop)
    );
  }

}
