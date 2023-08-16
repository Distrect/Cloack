import { GlobalConfigService } from 'src/config/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Program } from './entities/program/program.entity';
import { Task } from './entities/task/task.entity';
import { ProgramTask } from './entities/programtask/programTask.entity';
import { User } from './entities/user/user.entity';
import { Tag } from './entities/tag/tag.entity';

/*import { AuditingUser } from './entities/user/user.audit';
import { AuditingTag } from './entities/tag/tag.audit';
import { AuditingSubscriber } from 'typeorm-auditing';
import { AuditingTask } from './entities/task/task.audit';
import { AuditingProgram } from './entities/program/program.audit';*/

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configModule: GlobalConfigService) => {
      const reset = configModule.getIsDevMode();
      const databaseOptions = configModule.getDatabaseConfig();

      const dataSource = new DataSource({
        ...(databaseOptions as DataSourceOptions),
        ...reset,
        logging: true,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
          /* AuditingTag,
          AuditingUser,
          AuditingTask,
          AuditingProgram,*/
          __dirname + '/../**/*.audit{.ts,.js}',
        ],
        //subscribers: [AuditingSubscriber],
      });

      const Data = await dataSource.initialize();

      const save = async (en: any) => await Data.manager.save(en);

      const user = Data.manager.create(User, {
        digits: { digits: 123456, exprationDate: new Date() },
        email: 'sametsie34@gmail.com',
        isAuthenticated: true,
        lastname: 'Sarıçiçek',
        name: 'Samet',
        password: '12345',
      });

      const newUser = await save(user);

      const tag = Data.manager.create(Tag, {
        tagColor: 'cyan',
        tagName: 'bro',
        user: newUser,
      });

      const newTag = await save(tag);

      const program = Data.manager.create(Program, {
        programDescription: 'Program 1',
        programName: 'Program 1',
        user: newUser,
        tag: newTag,
      });
      const newProgram = await save(program);

      const task1 = Data.manager.create(Task, {
        isReusable: false,
        order: 0,
        taskColor: 'red',
        taskDuration: '00:15:00',
        taskName: 'Task 1',
        taskDescription: 'Task 1',
        user,
      });

      const newTask1 = await save(task1);
      const task2 = Data.manager.create(Task, {
        isReusable: false,
        order: 0,
        taskColor: 'green',
        taskDuration: '00:15:00',
        taskName: 'Task 2',
        taskDescription: 'Task 2',
        user,
      });

      const newTask2 = await save(task2);
      const programTask1 = Data.manager.create(ProgramTask, {
        order: 1,
        program: newProgram,
        task: newTask1,
      });
      const programTask2 = Data.manager.create(ProgramTask, {
        order: 1,
        program: newProgram,
        task: newTask2,
      });

      await save(programTask1);
      await save(programTask2);

      const tag1 = Data.manager.create(Tag, {
        tagColor: 'red',
        tagName: 'bas',
        user: newUser,
      });
      const tag2 = Data.manager.create(Tag, {
        tagColor: 'blue',
        tagName: 'hasan',
        user: newUser,
      });

      await save(tag1);
      await save(tag2);

      newProgram.tag = tag1;
      await save(newProgram);

      const repo = Data.manager.getRepository(Tag);

      await repo.delete(tag1);

      const programRepo = Data.manager.getRepository(Program);
      /*
      const result = await Data.manager
        .createQueryBuilder(Program)
        .leftJoin(
          ProgramTask,
          'program_task',
          'program.programId = program_task.program',
        )
        .leftJoinAndMapOne('task', 'task', 'task.taskId = program_task.task')
        .getMany();
      console.log(result);
*/
      return new Promise((res, rej) => res(Data));
    },
    inject: [GlobalConfigService],
  },
];

//ekelmedir
/*const user = await dataSource.manager.create(User, {
        name: 'Samet',
        lastname: 'Sarıçiçek',
        digits: { digits: 1, exprationDate: new Date() },
        email: 'ee3wqewq',
        isAuthenticated: true,
        password: '321321',
      });*/
/*
      const DataS = await dataSource.initialize();
      const repo = DataS.manager.getRepository(AuditingUser);
      console.log(repo);*/
/*
      const userRepo = DataS.getRepository(User);
      userRepo.create({
        name: 'Samet',
        lastname: 'Sarıçiçek',
        digits: { digits: 1, exprationDate: new Date() },
        email: 'ee3wqewq',
        isAuthenticated: true,
        password: '321321',
      });*/
/*
      const newUser = DataS.manager.create(User, {
        name: 'Samet',
        lastname: 'Sarıçiçek',
        digits: { digits: 1, exprationDate: new Date() },
        email: 'ee3wqewq',
        isAuthenticated: true,
        password: '321321',
      });

      await DataS.manager.save(newUser);

      const newTag = DataS.manager.create(Tag, {
        tagColor: 'red',
        tagName: 'ehe',
      });

   
      await DataS.manager.save(newTag);*/

/*import { AuditingSubscriber } from 'typeorm-auditing';
import { AuditingUser } from './entities/user/user.audit';
import { User } from './entities/user/user.entity';
import { AuditingTag } from './entities/tag/tag.audit';
import { Tag } from './entities/tag/tag.entity';*/

/*
      const Data = await dataSource.initialize();
      const save = async (entiti) => await Data.manager.save(entiti);

      const program1 = Data.manager.create(Program, {
        isDeleted: false,
        programDescription: 'Long text',
        programName: 'Program 1',
      });
      console.log(program1);
      await save(program1);

      const task1 = Data.manager.create(Task, {
        order: 1,
        taskColor: 'red',
        taskDescription: 'Task 1',
        taskName: 'Task1',
        taskDuration: '00:15:00',
      });
      await save(task1);

      const programTask = Data.manager.create(ProgramTask, {
        order: 1,
      });

      programTask.program = program1;
      programTask.task = task1;

      await save(programTask);

      // program1.programtask = [task1.taskId];

      // await save(program1);

      return Data;*/

/*let result = await programRepo
        .createQueryBuilder('program')
        .innerJoinAndSelect(
          'program.programtask',
          'program_task',
          'program.programId = program_task.program',
        )
        .innerJoinAndSelect(
          'program_task.task',
          'task',
          'task.taskId = program_Task.task',
        )
        .getMany();

      // const result = await Data.manager
      //   .createQueryBuilder(Program)
      //   .leftJoin(
      //     ProgramTask,
      //     'program_task',
      //     'program.programId = program_task.program',
      //   )
      //   .leftJoinAndMapOne('task', 'task', 'task.taskId = program_task.task')
      //   .getMany();

      console.log(result[0]?.programtask?.[0], result);

      /*
      Data.manager.delete(newTag, {
        where: {
          tagId: newTag.tagId,
        },
      });*/

/*
      const auditRepo = Data.manager.getRepository(AuditingUser);

      const res = await auditRepo
        .createQueryBuilder('auditing_user')
        .innerJoinAndMapMany(
          'auditing_user.tags',
          AuditingTag,
          'tags',
          'tags.user = auditing_user.userId',
        )
        .getMany();

      console.log(res);
*/
