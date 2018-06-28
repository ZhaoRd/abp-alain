import { RolesModule } from './roles.module';

describe('RolesModule', () => {
  let rolesModule: RolesModule;

  beforeEach(() => {
    rolesModule = new RolesModule();
  });

  it('should create an instance', () => {
    expect(rolesModule).toBeTruthy();
  });
});
