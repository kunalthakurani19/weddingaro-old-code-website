import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor(private userService:UserService, private toasterService:ToastrService){
  }
  @Output() emitDeleteEvent:EventEmitter<any> = new EventEmitter();
  @Output() editEmitter:EventEmitter<any> = new EventEmitter();
  @Output() emitAttendance:EventEmitter<any> = new EventEmitter();


  @Input() groups!: any[];
  @Input() title!: string;
  @Input() menues!: any[];
  ngOnInit(): void {}
  getMenu(id: string=''){
    return this.menues.map((item)=>{
      if(item._id==id) return item.menuname
    })
  }
  deleteGuest(id:string){
    this.userService.removeGuest(id).subscribe(res=>{
      this.emitDeleteEvent.emit(true)
      this.toasterService.success('Guest removed successfully!')
    })
  }
  openEditModal(data:any){
    this.editEmitter.emit(data)
  }
  updateAttendance(event:any, id:string){
    if(!event.target.value) return
    let payload ={
      "key": "attendance",
      "value": event.target.value,
      "id": id
    }
    this.emitAttendance.emit(payload)

  }

}
