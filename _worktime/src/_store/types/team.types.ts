import { IUser } from './user.types';
import { IBasicWorkTime } from './worktime.types';

export interface ITeam {
  empId: string;
  user: IUser;
  schedule: IBasicWorkTime;
}
