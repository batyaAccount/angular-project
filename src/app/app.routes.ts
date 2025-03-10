import { Routes } from '@angular/router';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { letGuard } from './let.guard';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: "sign-in", component: SignInComponent },
    { path: "sign-up", component: SignUpComponent },
    { path: "add-course", component: AddCourseFormComponent },
    { path: "add-course/:courseId", component: AddCourseFormComponent , canActivate:[letGuard] },
    { path: "home", component: HomePageComponent, children: [
            {
                path: "my-courses", component: MyCoursesComponent, children: [
                    {
                        path: ":id", component: CourseComponent,
                    }
                ]
            },
            {
                path: "courses-page", component: CoursesPageComponent, children: [
                    { path: ":id", component: CourseComponent }
                ]
            },
        ]
    }
];
