import { Pipe, PipeTransform } from '@angular/core';
import { Lessons } from '../../Lessons';

@Pipe({
  standalone:true,
  name: 'lessons'
})
export class LessonsPipe implements PipeTransform {


  transform(lessons: Partial<Lessons>[]): string {
    if (!lessons || lessons.length === 0) {return 'No lessons available.';}
    
    let result = '';
    for (let i = 0; i < lessons.length; i++) {
      result += `Lesson ${i + 1}: ${lessons[i]?.title}<br>${lessons[i]?.content}<br><br>`;}
      return result;
  }
}