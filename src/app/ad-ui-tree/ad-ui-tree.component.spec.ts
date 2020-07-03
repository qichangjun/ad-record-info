import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUiTreeComponent } from './ad-ui-tree.component';

describe('AdUiTreeComponent', () => {
  let component: AdUiTreeComponent;
  let fixture: ComponentFixture<AdUiTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdUiTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdUiTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
