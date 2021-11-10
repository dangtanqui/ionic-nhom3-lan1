import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lop } from 'src/app/models/lop';
import { LopService } from 'src/app/services/lop.service';

@Component({
  selector: 'app-update-lop',
  templateUrl: './update-lop.page.html',
  styleUrls: ['./update-lop.page.scss'],
})
export class UpdateLopPage implements OnInit {
  @Input() lop: Lop;

  constructor(private modalCtr: ModalController,
    private lopService: LopService) {
    }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtr.dismiss();
  }

  async updateLop() {
    this.lopService.updateLop(this.lop).subscribe(
      async () => await this.modalCtr.dismiss(this.lop)
    );
  }

}
