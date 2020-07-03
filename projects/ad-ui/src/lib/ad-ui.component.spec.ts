import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUiComponent } from './ad-ui.component';

describe('AdUiComponent', () => {
  let component: AdUiComponent;
  let fixture: ComponentFixture<AdUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
