import { Controller, Get, Param, Post } from '@nestjs/common';
import { BagService } from '../service/bag.service';
import { ListBagInput, ListBagOutput } from '../dto/list-bag.dto';
import {
  CreateEmptyBagInput,
  CreateEmptyBagOutput,
} from '../dto/create-empty-bag.dto';
import {
  CreateLoadBagInput,
  CreateLoadBagOutput,
} from '../dto/create-load-bag.dto';
import { GetBagOutput } from '../dto/get-bag.dto';

@Controller('v1/bags')
export class BagControllerV1 {
  constructor(private readonly bagService: BagService) {}

  @Get()
  public async list(input: ListBagInput): Promise<ListBagOutput> {
    return await this.bagService.list(input);
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<GetBagOutput | null> {
    return await this.bagService.get(id);
  }

  @Post('empty')
  public async createEmptyBag(
    input: CreateEmptyBagInput,
  ): Promise<CreateEmptyBagOutput> {
    return await this.bagService.createEmptyBag(input);
  }

  @Post('loaded')
  public async createLoadedBag(
    input: CreateLoadBagInput,
  ): Promise<CreateLoadBagOutput> {
    return await this.bagService.createLoadedBag(input);
  }
}
