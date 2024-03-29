import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferencesPageRoutingModule } from './preferences-routing.module';

import { PreferencesPage } from './preferences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferencesPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PreferencesPage]
})
export class PreferencesPageModule {}
