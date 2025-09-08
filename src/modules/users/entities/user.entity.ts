import { PrimaryEntity } from 'src/infra/database/typeorm/primary.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserRoleEnum } from '../enum/userRole.enum';
import { Project } from 'src/modules/projects/entities/project.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';

@Entity('users')
export class User extends PrimaryEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRoleEnum;

  @Column()
  company_id: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
