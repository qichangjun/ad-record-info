import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUiScrollBoxComponent } from './ad-ui-scroll-box.component';

describe('AdUiScrollBoxComponent', () => {
  let component: AdUiScrollBoxComponent;
  let fixture: ComponentFixture<AdUiScrollBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdUiScrollBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdUiScrollBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
