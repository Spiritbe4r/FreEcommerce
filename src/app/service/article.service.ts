import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { ParametreService } from '../service/parametre.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
 private baseUrl = 'http://localhost:8000/products';
  private djUrl = 'http://localhost:8000/product/products/create/';
  private djlistUrl='http://localhost:8000/products/';
  parametre: any = {};
  host: string = 'http://localhost:8000/product/image/1/';
  choixmenu: string = 'A';
  list: any = [];
  public dataForm: FormGroup;
  constructor(private http: HttpClient, private parametreService: ParametreService) { }
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  getNumero(code: string) {
    return this.http.get(`${this.baseUrl}/7/${code}`);
  }
  getListArtf(code: number) {
    return this.http.get(`${this.baseUrl}/f/${code}`);
  }
  createData(formData: FormData): Observable<any> {

    return this.http.post(`${this.djUrl}`, formData);
  }

  updatedata(id: number, info: Object): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/${id}/`, info);
  }

  

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.djlistUrl}${id}/`, { responseType: 'text' });
  }

  getAll(): Observable<any> {

    return this.http.get(`${this.djlistUrl}`);
  }


  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getExcelData(){
    return this.http.get<any>(`${this.baseUrl}/export/excel`, { responseType: 'arraybuffer' as 'json' });
  }
 


  onselectParametre(id: number) {
    this.parametreService.getData(id).subscribe(
      response => {
        this.parametre = response;
      }
    )
  }
  getDocument() {

    this.onselectParametre(1);
    this.getAll().subscribe(
      response => {
        
        this.list = response;
      }
    );
    
    return {
      pageSize : 'A4',
      pageOrientation : 'landscape',
      footer: function (currentPage, pageCount) {
        return {
            table: {
                body: [
                    [
                      //  { image: 'sampleImage.jpg', alignment: 'center', fit: [400, 400] },
                        { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'normalText', margin: [400, 20, 50, 0] }
                    ],
                ]
            },
            layout: 'noBorders'
        };
    },
      content: [
        {
          columns: [
            [{
              text: this.parametre.libelle,
              style: 'name'
            },
            {
              text: this.parametre.adresse,
              style: 'line'
            },
            {
              text: 'Email : ' + this.parametre.email,
              style: 'line'
            },
            {
              text: 'Tel  : ' + this.parametre.tel,
              style: 'line',
            },
            ],
          ]
        },
        {
          text: 'Liste Des Articles',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

             this.getList(this.list),
             {
     
             },


        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right'

        },

       

      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,

          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },

        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 15,
          alignment: 'center'
        }
      }
    };
  }


  getList(items: Article[]) {
    return {
      table: {
        widths: [100, 200, 70, 70, 60, 200],
        body: [
          [{
            text: 'Code',
            style: 'tableHeader'
          },
          {
            text: 'Désignation',
            style: 'tableHeader'
          },
          {
            text: 'P_Achat',
            style: 'tableHeader'
          },
          {
            text: 'P_Vente',
            style: 'tableHeader'
          },
          {
            text: 'TVa',
            style: 'tableHeader'
          },
          {
            text: 'Fournisseur',
            style: 'tableHeader'
          },
          ],
         ...items.map(ed => {
            return [ed.code, ed.libelle, ed.pa, ed.pv, ed.tva, ed.four];
          })
        ]
      }
    };
  }
}





