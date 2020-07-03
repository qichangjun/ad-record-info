import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdRecordinfoComponent } from './ad-recordinfo.component';

describe('AdRecordinfoComponent', () => {
  let component: AdRecordinfoComponent;
  let fixture: ComponentFixture<AdRecordinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdRecordinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdRecordinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
