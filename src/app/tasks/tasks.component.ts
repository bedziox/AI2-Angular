import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {Task} from "../task";
import { TitleStrategy } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  public newTask: Task = {};
  public isProcessing = false;
  constructor(
    private tasksService: TasksService
  ) {
  }

  ngOnInit() {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.isProcessing = false;
  }

  addTask(){
    console.log("test");
    if(this.newTask.title === undefined){
      console.log("test2")
      return;
    }
    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasks.unshift(this.newTask);

    this.tasksService.post(this.newTask).subscribe((task) => {
      this.newTask = {};
      this.ngOnInit();
    })
  }

  handleChange(task:Task){
    console.log("change");
    this.tasksService.put(task).subscribe({
      error: err=>{
        alert(err);
        this.ngOnInit();
      }
    })
  }

  archiveCompleted(){
    const observables:Observable<any>[] = [];
    for(const task of this.tasks){
      if(!task.completed){
        continue;
      }

      task.archived = true;
      observables.push(this.tasksService.put(task));
    }
    forkJoin(observables).subscribe(()=>{
      this.ngOnInit();
    })
  }
}
