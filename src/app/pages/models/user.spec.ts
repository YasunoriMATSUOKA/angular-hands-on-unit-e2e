import { User, USER } from './user';

xdescribe('User', () => {
  it('should create an instance', () => {
    expect(new User(USER)).toBeTruthy();
  });
});
