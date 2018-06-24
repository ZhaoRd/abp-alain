import { TenantsModule } from './tenants.module';

describe('TenantsModule', () => {
  let tenantsModule: TenantsModule;

  beforeEach(() => {
    tenantsModule = new TenantsModule();
  });

  it('should create an instance', () => {
    expect(tenantsModule).toBeTruthy();
  });
});
