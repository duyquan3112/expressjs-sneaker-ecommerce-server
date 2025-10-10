import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IUser, UserRole } from "../interfaces/user.interface";

@Entity("users")
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  firstName!: string;

  @Column({ type: "varchar", length: 255 })
  lastName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  // https://typeorm.io/docs/entity/entities/#enum-column-type
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({ type: "date" })
  birthDate!: Date;

  @Column({ type: "varchar", length: 255, unique: true })
  phoneNumber!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;
}
