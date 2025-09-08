import { PrimaryEntity } from 'src/infra/database/typeorm/primary.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Expose } from 'class-transformer';
import { User } from 'src/modules/users/entities/user.entity';
import { Company } from 'src/modules/users/entities/company.entity';

@Entity('projects')
export class Project extends PrimaryEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  company_id: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @ManyToOne(() => Company, (company) => company.projects)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Expose()
  tasks_count(): number {
    return this.tasks ? this.tasks.length : 0;
  }

  @Expose()
  completed_tasks_count(): number {
    return this.tasks
      ? this.tasks.filter((task) => task.status === 'completed').length
      : 0;
  }
}
