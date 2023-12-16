import { Component, OnInit } from '@angular/core';
import { PersonLsService } from '../person-ls.service';
import { Person } from '../person';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  people: Person[] = [];

  constructor(private personLsService: PersonLsService){

  }
  ngOnInit(): void {
      this.people = this.personLsService.getAll();
  }
  delete(index:number){
    if(confirm("Are you sure?")){
      this.personLsService.deletePerson(index);
      this.people = this.personLsService.getAll();
    }
  
  }
}
