import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
import { DataSource } from 'typeorm';
import { DATABASE_PROVIDE_NAME_PG } from '../../../../utils/constants';

@Controller('v1/bags')
export class BagControllerV1 {
  constructor(
    private readonly bagService: BagService,
    @Inject(DATABASE_PROVIDE_NAME_PG)
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  public async list(@Query() input: ListBagInput): Promise<ListBagOutput> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.bagService.list(input, entityManager);
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<GetBagOutput | null> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.bagService.get(id, entityManager);
    });
  }

  @Post('empty')
  public async createEmptyBag(
    @Body() input: CreateEmptyBagInput,
  ): Promise<CreateEmptyBagOutput> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.bagService.createEmptyBag(input, entityManager);
    });
  }

  @Post('loaded')
  public async createLoadedBag(
    @Body() input: CreateLoadBagInput,
  ): Promise<CreateLoadBagOutput> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.bagService.createLoadedBag(input, entityManager);
    });
  }
}
