import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
