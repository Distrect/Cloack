import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Tag } from './tag.entity';
import { tagUpdateDto } from 'src/modules/tag/dto/tag.dto';

@Injectable()
export class TagEntityService {
  constructor(@Inject('TagRepository') private tagRepository: Repository<Tag>) {
    console.log(tagRepository);
  }

  public async createTag() {}

  public async getTags(userId: number) {
    return await this.tagRepository.find({
      where: {
        user: { userId },
      },
    });
  }

  public async updateTag(tagId: number, tagBody: tagUpdateDto) {
    const updated = await this.tagRepository.update({ tagId }, tagBody);
    console.log(updated);
    return updated.raw[0];
  }

  public async deleteTag(tagId: number) {
    const deleted = await this.tagRepository.delete({ tagId });
    console.log(deleted);
    return deleted;
  }
}
