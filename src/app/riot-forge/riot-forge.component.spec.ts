import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotForgeComponent } from './riot-forge.component';

describe('RiotForgeComponent', () => {
  let component: RiotForgeComponent;
  let fixture: ComponentFixture<RiotForgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiotForgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiotForgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
