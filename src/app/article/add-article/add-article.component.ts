import { Component, OnInit, Inject } from '@angular/core';
import { ScategorieService } from '../../service/scategorie.service';
import { CategorieService } from '../../service/categorie.service';
import { ArticleService } from '../../service/article.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../model/categorie';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from 'src/app/model/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';
import {  ProductPayload } from '../product';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styles: [
  ]
})
export class AddArticleComponent implements OnInit {
  selectedCat: number ;
  num: any;
  code: string;
  CategorieList: Categorie[];
  ScategorieList: any[];
  scategorie: any = {};
  userFile;
  public imagePath;
  imgURL: any;
  public message: string;
  codef : string;
  name : string;

  suppliers: Supplier[] ; // | undefined;
  suplierSeleccionado:Supplier ;

  categories: Category[] ; // | undefined;
  categoriaSeleccionada:Category ;

  productPayload: ProductPayload;
  registerForm: FormGroup;
  constructor(public crudApi: ArticleService, public fb: FormBuilder, public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    public userService: UserService,
    public catService: CategoryService,
    private supplierService : SupplierService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddArticleComponent>,

  ) { 

    this.productPayload={
    id:null,
    name:null,
    purchase_price:null,
    price:null,
    vat:null,
    category:null,
    stock:null,
    supplier:null,
    description:null,
    }
  }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response; }
    );
    



    this.cargarSuppliers();
    this.cargarCategories();
    
    
    
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      
      name: ['', [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z 0-9]*')]],
      purchase_price: [0, [Validators.required,Validators.pattern('[0-9.]*')]],
      price: [0, [Validators.required,Validators.pattern('[0-9.]*'),Validators.maxLength(5)]],
      vat: [0, [Validators.required]],
      stock: [0, [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(4)]],
      category: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      description: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      codef : [''],
    });
  }

  cargarSuppliers()
  {
    
      this.supplierService.getSupplierList().subscribe(
        data=>{
          console.log(data);
          this.suppliers=data;
        },
        error=>{
          console.log(error);
          this.message="Nose se pudo obtener los proveedores disponibles"
        }
      )

    };

    cargarCategories()
  {
    
      this.catService.getCategoryList().subscribe(
        (data:any)=>{
          console.log(data.id);
          this.categories=data;
          this.f['category'].setValue(data.id);
        },
        error=>{
          console.log(error);
          this.message="Nose se pudo obtener los categorias disponibles"
        }
      )

    };

  

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  
  onCategorySelected (event: any) {

    this.catService.getCategoryList().subscribe(
      (data:any)=>{
        console.log(data.id);
        this.categories=data;
       
      },
      error=>{
        console.log(error);
        this.message="Nose se pudo obtener los categorias disponibles"
      }
    )
    //update the ui
    this.selectedCat = event.target.value;
    //this.f['category'].setValue(this.selectedCat);
    //console.log(this.selectedCat)
    

  
  }
  getData() {
    
    this.crudApi.getAll().subscribe(
      response => {
        
        this.crudApi.list = response;
      }
    );

  }
  
  

    onSelectCateg(code: string) {
      this.scategorieService.listScateg(code).subscribe(
        response => { this.ScategorieList = response; }
      );
    }
  

  addData() {
 
    const formData = new FormData();
    
    //const article = this.crudApi.dataForm.value;
    //formData.append('article', JSON.stringify(article));
   // formData.append('file', this.userFile);
   /*
    this.productPayload.name=this.crudApi.dataForm.get('name')?.value;
    this.productPayload.category=this.registerForm.get('category')?.value;
    this.productPayload.name=this.registerForm.get('name')?.value;
    this.productPayload.purchase_price=this.registerForm.get('purchase_price')?.value;
    this.productPayload.stock=this.registerForm.get('stock')?.value;
    this.productPayload.price=this.registerForm.get('price')?.value;
    this.productPayload.supplier=this.registerForm.get('supplier')?.value;
    this.productPayload.description=this.registerForm.get('description')?.value;*/
    

    formData.append('img', this.userFile);
    formData.append('category',this.crudApi.dataForm.get('category')?.value)
    formData.append('name',this.crudApi.dataForm.get('description')?.value)
    formData.append('purchase_price',this.crudApi.dataForm.value.purchase_price)
    formData.append('stock',this.crudApi.dataForm.value.stock)
    formData.append('vat',this.crudApi.dataForm.value.vat)
    formData.append('price',this.crudApi.dataForm.value.price)
    formData.append('supplier',this.crudApi.dataForm.get('supplier')?.value)
    formData.append('description',this.crudApi.dataForm.get('description')?.value)

    this.crudApi.createData(formData).subscribe(data => {
      this.toastr.success( 'Articulo Registrado Correctamente ! ');
      this.dialogRef.close();
      
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
    
     
      this.router.navigate(['/articles']);
    },error =>{
      console.log(error)
      this.toastr.warning( 'Lo sentimos Ocurrio un error Inesperado, Intenta Denuevo');
    });
  }
  /*
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/articles']);
      });
  }*/

  updateData(){
    const formData = new FormData();
      
      //const users = this.crudApi.formData.value;
      formData.append('img', this.userFile);
    formData.append('category',this.crudApi.dataForm.get('category')?.value)
    formData.append('name',this.crudApi.dataForm.get('description')?.value)
    formData.append('purchase_price',this.crudApi.dataForm.value.purchase_price)
    formData.append('stock',this.crudApi.dataForm.value.stock)
    formData.append('vat',this.crudApi.dataForm.value.vat)
    formData.append('price',this.crudApi.dataForm.value.price)
    formData.append('supplier',this.crudApi.dataForm.get('supplier')?.value)
    formData.append('description',this.crudApi.dataForm.get('description')?.value)
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,formData).
    subscribe( data => {
      console.log(data);
      this.toastr.success( 'Modificacion  Exitosa');
      this.dialogRef.close();
      this.getData();
      //window.location.href="/users"

      //this.router.navigate(['/users']);
    },error =>{
      console.log(error)
      this.toastr.warning( 'Lo sentimos Ocurrio un error Inesperado, Intenta Denuevo');
    });
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
}
