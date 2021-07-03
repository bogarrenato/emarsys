import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuedatecalculatorComponent } from './duedatecalculator.component';
import {Constants} from '../constants/constants'



describe('DueDateCalculator Component Normal Cases', () => {
  let component: DuedatecalculatorComponent;
  let fixture: ComponentFixture<DuedatecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuedatecalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuedatecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



    it("Test if turnaround time is plus one hour ",()=>{
        const submit = new Date(2021,6,2,12,0);
        expect(component.CalculateDueDate(submit,Constants.ONE)).toEqual(
          new Date(2021,6,2,13,0),
        );
    })

    it("Test if turnaround time ends before the end of workday ",()=>{
        const submit = new Date(2021,6,2,12,0);
        expect(component.CalculateDueDate(submit,(4*Constants.ONE))).toEqual(
          new Date(2021,6,2,16,0),
        );
    })

    it("Test if turnaround time ends one hour after end of worktime ",()=>{
      const submit = new Date(2021,6,1,16,0);
      expect(component.CalculateDueDate(submit,(2*Constants.ONE))).toEqual(
        new Date(2021,6,2,10,0),
      );
  })

    it("Test if turnaround time is one work day ",()=>{
      const submit = new Date(2021,6,1,16,0);
      expect(component.CalculateDueDate(submit,Constants.DAILYWORKTIME)).toEqual(
        new Date(2021,6,2,16,0),
      );
  })

    it("Test if turnaround time is one and a half workday ",()=>{
      const submit = new Date(2021,6,1,9,0);
      expect(component.CalculateDueDate(submit,(1.5*Constants.DAILYWORKTIME))).toEqual(
        new Date(2021,6,2,13,0),
      );
  })

    it("Test if turnaround time is two workdays with weekends ",()=>{
      const submit = new Date(2021,6,1,9,0);
      expect(component.CalculateDueDate(submit,(2*Constants.DAILYWORKTIME))).toEqual(
        new Date(2021,6,5,9,0),
      );
    })
});


describe('Error Cases', () => {
  let component: DuedatecalculatorComponent;
  let fixture: ComponentFixture<DuedatecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuedatecalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuedatecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Test if its before working hour",()=>{
       const submit = new Date(2021,6,2,8,0);
       expect(() => component.CalculateDueDate(submit,  Constants.DAILYWORKTIME )).toThrow(new Error('Submission date is not in range'));
  })

  it("Test if its after working hour",()=>{
    const submit = new Date(2021,6,2,18,0);
    expect(() => component.CalculateDueDate(submit,  Constants.DAILYWORKTIME )).toThrow(new Error('Submission date is not in range'));
})

  it("Test if its weekend",()=>{
    const submit = new Date(2021,6,3,8,0);
    expect(() => component.CalculateDueDate(submit,  Constants.DAILYWORKTIME )).toThrow(new Error('Submission date is not in range'));
  })

  it("Test if turnaround time is less than 1 hour",()=>{
    const submit = new Date(2021,6,2,9,0);
    expect(() => component.CalculateDueDate(submit,  0.5*Constants.ONE )).toThrow(new Error('Invalid turnaround time!'));
  })

  it("Test if turnaround time is negative ",()=>{
    const submit = new Date(2021,6,2,9,0);
    expect(() => component.CalculateDueDate(submit,  -0.5*Constants.ONE )).toThrow(new Error('Invalid turnaround time!'));
  })

  it("Test if turnaround time is null ",()=>{
    const submit = new Date(2021,6,2,9,0);
    expect(() => component.CalculateDueDate(submit,  null )).toThrow(new Error('Invalid turnaround time!'));
  })

});
