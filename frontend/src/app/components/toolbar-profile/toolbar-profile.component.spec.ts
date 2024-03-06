import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarProfileComponent } from './toolbar-profile.component';

describe('ToolbarProfileComponent', () => {
  let component: ToolbarProfileComponent;
  let fixture: ComponentFixture<ToolbarProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarProfileComponent]
    });
    fixture = TestBed.createComponent(ToolbarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
