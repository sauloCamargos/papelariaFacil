import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
// import { ImageUploadModule } from 'angular2-image-upload';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { SecuredDirective } from './directives/secured.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FilterListPipe } from './pipes/filter.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SelectMediaComponent } from './select-media/select-media.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import { InputImageModule } from 'src/app/shared/input-image/input-image.module';
import { ScInputDirective } from './directives/sc-input.directive';
import { BaseListComponent } from '@app/shared/base-list/base-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    SidebarComponent,
    ControlSidebarComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    SecuredDirective,
    PaginatorComponent,
    DateRangeComponent,
    FilterListPipe,
    SafeUrlPipe,
    SelectMediaComponent,
    ScInputDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    // ImageUploadModule.forRoot(),
    MatButtonModule,
    InputImageModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    SidebarComponent,
    ControlSidebarComponent,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    SecuredDirective,
    ScInputDirective,
    PaginatorComponent,
    DateRangeComponent,
    MatSelectModule,
    FilterListPipe,
    SafeUrlPipe,
    SelectMediaComponent,
    // ImageUploadModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    InputImageModule,
    MatTableModule,
    MatCheckboxModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[
  ]
})
export class SharedModule { }
