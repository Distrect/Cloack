import {
  Controller,
  Get,
  Inject,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';
import { TagService } from './tag.service';
import { tagUpdateDto } from './dto/tag.dto';
import { EmptyBodyInterceptor } from 'src/interceptors/emptyBody.interceptor';

@Controller('tag')
export class TagController {
  constructor(@Inject(TagService) private tagService: TagService) {}

  @Get('/getTags')
  public async GetTags(@StoredUser() user: CookieUser) {
    const userTags = await this.tagService.getAllTags(user.userId);

    return { ok: true, message: 'All tags are retrieved', userTags };
  }

  @Patch('/updateTag/:tagId')
  @UseInterceptors(EmptyBodyInterceptor)
  public async UpdateTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() requestBody: tagUpdateDto,
  ) {
    const updatedTag = await this.tagService.updateTag(tagId, requestBody);
    console.log(updatedTag);
  }

  @Delete('/deleteTag/:tagId')
  public async DeleteTag(@Param('tagId', ParseIntPipe) tagId: number) {
    const deleted = await this.tagService.deleteTag(tagId);
    return { ok: true, message: `Tag is succesfully deleted` };
  }
}
