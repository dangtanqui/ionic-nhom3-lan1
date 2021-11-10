import { Injectable } from '@angular/core';
import { Lop } from '../models/lop';
import { lops } from '../models/lops';
import { Student } from '../models/student';
import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LopService {
  // private urlBase: String = "http://localhost:8080/api";
  lops: Lop[] = lops;

  constructor(private http: HttpClient) { }

  getLops() {
    // return this.http.get<Lop[]>(`${this.urlBase}/lops`);

    return of(lops);
  }

  addLop(lop: Lop) {
    // return this.http.post<Object>(`${this.urlBase}/lop`, lop);

    lop.maLop = lop.tenLop; // test
    lops.push(lop);
    return of(null);
  }

  updateLop(lopUpdate: Lop) {
    // return this.http.put<Lop>(`${this.urlBase}/lop/${lopUpdate.maLop}`, lopUpdate);

    const index = lops.findIndex(lop => lop.maLop === lopUpdate.maLop);
    lops[index].tenLop = lopUpdate.tenLop;
    if (lopUpdate.danhSachSinhVien.length > 0) {
      lops[index].danhSachSinhVien = lopUpdate.danhSachSinhVien;
    }
    return of(lopUpdate);
  }

  deleteLop(lopDelete: Lop) {
    // return this.http.delete<Object>(`${this.urlBase}/lop/${lopDelete.maLop}`);

    const index = lops.findIndex(lop => lop.maLop === lopDelete.maLop);
    this.lops.splice(index, 1);
    return of(null);
  }

  deleteStudent(lopDeleteStudent: Lop, studentDelete: Student) {
    // return this.http.delete<Object>(`${this.urlBase}/sinhvien/${studentDelete.masv}`);

    const indexLop = lops.findIndex(lop => lop.maLop === lopDeleteStudent.maLop);
    const indexStudent = this.lops[indexLop].danhSachSinhVien.findIndex(student => studentDelete.masv === student.masv);
    this.lops[indexLop].danhSachSinhVien.splice(indexStudent, 1);
    return of(null);
  }
}
