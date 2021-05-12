import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { InputImageModule } from 'src/app/shared/input-image/input-image.module';
// import { ImageUploadModule } from 'angular2-image-upload';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { ScInputDirective } from './directives/sc-input.directive';
import { SecuredDirective } from './directives/secured.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FilterListPipe } from './pipes/filter.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SelectMediaComponent } from './select-media/select-media.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarErrorLayoutComponent } from './snack-bar-error-layout/snack-bar-error-layout.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { RankingModule } from './ranking/ranking.module';
import {MatDialogModule} from '@angular/material/dialog';



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
    ScInputDirective,
    SnackBarErrorLayoutComponent,
    BreadcrumbComponent
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
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatTabsModule,
    RankingModule,
    MatDialogModule
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
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    BreadcrumbComponent,
    MatListModule,
    MatTabsModule,
    RankingModule,
    MatDialogModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[
  ]
})
export class SharedModule { }
