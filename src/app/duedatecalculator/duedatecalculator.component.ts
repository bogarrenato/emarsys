import { Component, OnInit } from '@angular/core';
import {WorkDays,Weekends} from '../enum/days'
import {Constants} from '../constants/constants'


@Component({
  selector: 'app-duedatecalculator',
  templateUrl: './duedatecalculator.component.html',
  styleUrls: ['./duedatecalculator.component.css']
})
export class DuedatecalculatorComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }
   CalculateDueDate(submitDate:Date, turnaroundTime:number):Date{
    /* Check if the value of submit time is valid */
    this.checkIfSubmitDateValid(submitDate);
    /* Check if the value of time is valid */
    this.checkIfTurnaroundTimeValid(turnaroundTime);
    var resultDate = submitDate;
    var hourOfDay:number = submitDate.getHours();
    var dayOfWeek:number = submitDate.getDay();
    var daysShallBeAdded = this.calculateDays(turnaroundTime,hourOfDay,dayOfWeek);
    resultDate.setDate(resultDate.getDate()+daysShallBeAdded)
    resultDate.setHours(resultDate.getHours()+this.calculateHours(turnaroundTime,resultDate.getHours()))
    console.log("EZ A RESULT DATE  "+resultDate)
    return resultDate;
  }

  private calculateDays (turnaroundTime:number, hourOfDay:number, dayOfWeek:number):number{
    var workDaysShallAdd : number = turnaroundTime/Constants.DAILYWORKTIME + ((hourOfDay+turnaroundTime%Constants.DAILYWORKTIME >= Constants.WORKTIMEEND)? 1:0);
    workDaysShallAdd=this.getEvenNumber(workDaysShallAdd)
    /* Each item is a key, so /w was added */
    var numberOfWorkDays =  Object.keys(WorkDays).length/2 ;
    var numberOfWeekends = Object.keys(Weekends).length/2 ;
    var weekendDays = numberOfWeekends * ( workDaysShallAdd / numberOfWorkDays) + (dayOfWeek+workDaysShallAdd % numberOfWorkDays > numberOfWorkDays? numberOfWeekends:0);
    var daysShouldbeAdded = workDaysShallAdd + weekendDays;
    return this.getEvenNumber(daysShouldbeAdded);

  }

  private calculateHours( turnaroundTime:number,hourOfDay:number):number{
    turnaroundTime=this.getEvenNumber(turnaroundTime);
    var returnValue:number = hourOfDay+turnaroundTime%Constants.DAILYWORKTIME>=Constants.WORKTIMEEND?
    Constants.WORKTIMESTART+turnaroundTime%Constants.DAILYWORKTIME-Constants.WORKTIMEEND : turnaroundTime % Constants.DAILYWORKTIME;
    return returnValue
  }


  private getEvenNumber(num:number){
    return num - num%1;
  }

  private checkIfSubmitDateValid(submitDate:Date){
    if(submitDate == null){
      throw new Error('Invalid submit date!')
    }
    var rightNow: Date= submitDate;
    rightNow=submitDate;
    if(!(rightNow.getDate() in WorkDays) || rightNow.getDate() < 0 || rightNow.getDate()>5 || rightNow.getHours() < Constants.WORKTIMESTART  || rightNow.getHours()>Constants.WORKTIMEEND){
      throw new Error('Submission date is not in range')
    }
    return new Date();
  }

  private checkIfTurnaroundTimeValid(turnaroundTime:number){
    if (turnaroundTime < 1) {
      throw new Error('Invalid turnaround time!')
    }
  }
}
