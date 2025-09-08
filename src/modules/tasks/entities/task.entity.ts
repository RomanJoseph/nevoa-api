import { PrimaryEntity } from 'src/infra/database/typeorm/primary.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('tasks')
export class Task extends PrimaryEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column()
  project_id: string;

  @Column({ nullable: true })
  assignee_id: string;

  @Column()
  due_date: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'assignee_id' })
  user: User;
}
