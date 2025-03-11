import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tmp',
  standalone: true,
  imports: [],
  templateUrl: './tmp.component.html',
  styleUrl: './tmp.component.css'
})
export class TmpComponent {
  /**
   *
   */
  constructor(private router: Router, private route: ActivatedRoute,) {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/add-course/' + courseId]);
  }
}
