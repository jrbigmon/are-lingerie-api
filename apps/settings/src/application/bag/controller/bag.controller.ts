import { Controller, Get } from '@nestjs/common';
import { BagService } from '../service/bag.service';
import { ListBagInput, ListBagOutput } from '../dto/list-bag.dto';

@Controller('v1/bags')
export class BagControllerV1 {
  constructor(private readonly bagService: BagService) {}

  @Get()
  public async list(input: ListBagInput): Promise<ListBagOutput> {
    return await this.bagService.list(input);
  }
}
