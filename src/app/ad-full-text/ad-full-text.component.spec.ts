import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFullTextComponent } from './ad-full-text.component';

describe('AdFullTextComponent', () => {
  let component: AdFullTextComponent;
  let fixture: ComponentFixture<AdFullTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdFullTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdFullTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
