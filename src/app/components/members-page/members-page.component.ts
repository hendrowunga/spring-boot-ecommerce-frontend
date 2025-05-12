import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-members-page',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './members-page.component.html',
  styleUrl: './members-page.component.css',
})
export class MembersPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
