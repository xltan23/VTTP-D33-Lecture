import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task, Todo } from './models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // Output Input
  // Event to be fired 
  @Output() 
  onNewTodo = new Subject<Todo>();

  // Input from app.component (Data is passed from app.component)
  @Input()
  todo:Todo | null = null;

  //VARIABLES
  todoForm!:FormGroup
  taskArray!:FormArray

  // CONSTRUCTOR
  // Works like @Autowired
  constructor(private fb:FormBuilder) {}

  // METHODS
  ngOnInit():void {
      this.todoForm = this.createForm(this.todo);
  }

  // Submit button 
  processForm() {
    // Retrieve todoForm value as Todo object (name, email and tasks)
    const todo:Todo = this.todoForm.value as Todo
    console.info('Processing form: ', todo)

  }

  // Clear button that resets form fields
  clearForm() {
    this.todoForm = this.createForm();
  }

  // If true, disables Save button 
  invalid():boolean {
    // Validators for form returns invalid => return true 
    // taskArray.length <= 0 indicates nothing is submitted in task field => return true
    return this.todoForm.invalid || this.taskArray.length <= 0
  }

  // Add TODO button that adds task field
  addTask() {
    // Insert an empty task (FormGroup) within the FormArray
    this.taskArray.push(this.createTask())
  }

  // Remove button that removes field by index
  removeTask(i:number) {
    console.info('Removed index: ', i)
    this.taskArray.removeAt(i)
  }

  // CreateForm method takes in Object or null
  private createForm(todo:Todo | null = null) {
    // Define taskArray to return (from createTasks -> createTask)
    if (this.todo?.tasks) {
      this.taskArray = this.createTasks(this.todo.tasks)
    } else {
      this.taskArray = this.createTasks([])
    }
    return this.fb.group({
      name:this.fb.control(todo?.name ? todo.name:'',[Validators.required, Validators.minLength(3)]),
      email:this.fb.control(todo?.email ? todo.email:'',[Validators.required, Validators.email]),
      tasks:this.taskArray
    })

  }

  // Creating single task (Returns FormGroup)
  // this.formbuilder.group() creates FormGroup
  private createTask(task:Task | null = null):FormGroup {
    return this.fb.group({
      // task?.task is pre-check that allows statement to be valid even if task is null
      // If not null => Return former
      // If null return => Return latter
      task: this.fb.control(task?.task ? task.task:'',[Validators.required]),
      priority: this.fb.control(task?.priority ? task.priority:'med')
    })
  }

  // Creating multiple tasks (Returns FormArray)
  // this.formbuilder.array() creates FormArray
  private createTasks(tasks:Task[] = []) {
    // Each task in array map into an task object (FormGroup)
    return this.fb.array(tasks.map(t => this.createTask(t)))
  }
}
