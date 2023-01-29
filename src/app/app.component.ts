import { Component } from '@angular/core';
import { Todo } from './components/todo/models';

const TODO:Todo = {
  name:'Ralph',
  email:'Ralph@gmail.com',
  tasks:[
    {task:'taekwondo',priority:'high'},
    {task:'coding',priority:'high'}
  ]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D33'
  
  // VARIABLES
  data:Todo = TODO

  // METHODS
  processTodo(todo:Todo) {
    console.info('>>>',todo)
  }
}
