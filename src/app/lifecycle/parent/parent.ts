import { Component } from '@angular/core';
import user from '../../shared/entity/user';
import { Child } from '../child/child';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  imports: [Child, MatButtonModule, CommonModule],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent {
  user: user = {
    name: 'John Doe',
    age: 30,
  };

  showChild = true;
  changeName() {
    this.user = {
      ...this.user,
      name: 'Mikhael',
    };
  }
  incrementAgeMuttable() {
    this.user.age += 2; // This will trigger ngDoCheck but not ngOnChanges in the child component
  }

  incrementAgeImuttable() {
    this.user = {
      ...this.user,
      age: this.user.age + 10,
    };
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }
}
