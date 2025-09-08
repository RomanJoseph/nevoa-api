import { PrimaryEntity } from 'src/infra/database/typeorm/primary.entity';
import { Project } from 'src/modules/projects/entities/project.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('companies')
export class Company extends PrimaryEntity {
  @Column()
  name: string;

  @OneToMany(() => Project, (project) => project.company_id)
  projects: Project[];
}
