import { Injectable, Inject } from '@nestjs/common';
import { TagEntityService } from 'src/database/entities/tag/tagEntity.service';
import { tagUpdateDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject(TagEntityService)
    private tagEntityService: TagEntityService,
  ) {}

  public async getAllTags(userId: number) {
    return await this.tagEntityService.getTags(userId);
  }

  public async updateTag(tagId: number, tagAttributes: tagUpdateDto) {
    return await this.tagEntityService.updateTag(tagId, tagAttributes);
  }

  public async deleteTag(tagId: number) {
    return await this.tagEntityService.deleteTag(tagId);
  }
}
