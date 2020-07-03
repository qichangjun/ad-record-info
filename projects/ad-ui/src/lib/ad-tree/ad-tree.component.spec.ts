import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTreeComponent } from './ad-tree.component';

describe('AdTreeComponent', () => {
  let component: AdTreeComponent;
  let fixture: ComponentFixture<AdTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
