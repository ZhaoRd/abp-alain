import { DyformdemoModule } from './dyformdemo.module';

describe('DyformdemoModule', () => {
  let dyformdemoModule: DyformdemoModule;

  beforeEach(() => {
    dyformdemoModule = new DyformdemoModule();
  });

  it('should create an instance', () => {
    expect(dyformdemoModule).toBeTruthy();
  });
});
