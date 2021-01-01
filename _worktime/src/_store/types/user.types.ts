export interface IUser {
  /** id пользователя*/
  id: string;
  /** ФИО*/
  fullName: string;
  /** имя*/
  firstName: string;
  /** фамилия*/
  secondName: string;
  /** отчество*/
  middleName: string;
  /** ссылка на фото*/
  photo: string;
  /** должность*/
  position: string;
  /** подразделение*/
  department: string;
  /** подразделение (иерархия)*/
  departmentPath: string;
  wiId?: string;
  /** Почта */
  email?: string;
}
