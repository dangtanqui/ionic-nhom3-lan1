import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lop } from '../models/lop';
import { LopService } from './lop.service';
import { lops } from '../models/lops';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private urlBase: String = "http://localhost:8080/api";
  // private urlBase: String = "https://springangularapi.azurewebsites.net/api";
  // private urlBase = environment.baseUrl;

  lops: Lop[];

  constructor(private http: HttpClient,
    private lopService: LopService) {
    this.lops = lopService.lops;
  }

  getAllStudents(): Observable<Student[]> {
    // return this.http.get<Student[]>(`${this.urlBase}/sinhviens`);
    
    var sinhViens: Student[] = [];
    this.lops.forEach(lop => {
      lop.danhSachSinhVien.forEach(student => {
        sinhViens.push(student);
      })
    })
    return of(sinhViens);
  }

  getAllStudentsByMaLop(maLop: String): Observable<Student[]> {
    // return this.http.get<Student[]>(`${this.urlBase}/sinhviens/${maLop}`);

    const index = this.lops.findIndex(lop => lop.maLop === maLop);
    return of(this.lops[index].danhSachSinhVien);
  }

  getStudentByMasv(masv: String): Observable<Student> {
    // return this.http.get<Student>(`${this.urlBase}/sinhvien/${masv}`);

    this.lops.forEach(lop => {
      lop.danhSachSinhVien.forEach(student => {
        if (student.masv === masv) {
          return of(student);
        }
      })
    })
    return of(null);
  }

  addStudent(maLop: String, student: Student): Observable<Object> {
    // return this.http.post<Object>(`${this.urlBase}/sinhvien/${maLop}`, student);

    const index = this.lops.findIndex(lop => lop.maLop === maLop);
    this.lops[index].danhSachSinhVien.push(student);
    return of(student);
  }

  updateStudent(masv:String, studentUpdate: Student): Observable<Student> {
    // return this.http.put<Student>(`${this.urlBase}/sinhvien/${masv}`, student);

    this.lops.forEach(lop => {
      lop.danhSachSinhVien.forEach(student => {
        if (student.masv === masv) {
          student = studentUpdate;
        }
      })
    })
    return of(studentUpdate);
  }

  deleteStudent(masv: String): Observable<Object> {
    // return this.http.delete<Object>(`${this.urlBase}/sinhvien/${masv}`);

    this.lops.forEach(lop => {
      const index = lop.danhSachSinhVien.findIndex(student => student.masv === masv);
      lop.danhSachSinhVien.splice(index, 1);
    })
    return of(null);
  }

}
