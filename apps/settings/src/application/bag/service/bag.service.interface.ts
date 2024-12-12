import {
  CreateEmptyBagInput,
  CreateEmptyBagOutput,
} from '../dto/create-empty-bag.dto';
import {
  CreateLoadBagInput,
  CreateLoadBagOutput,
} from '../dto/create-load-bag.dto';
import { GetBagOutput } from '../dto/get-bag.dto';
import { ListBagInput, ListBagOutput } from '../dto/list-bag.dto';

export interface BagServiceInterface {
  createEmptyBag(input: CreateEmptyBagInput): Promise<CreateEmptyBagOutput>;
  createLoadedBag(input: CreateLoadBagInput): Promise<CreateLoadBagOutput>;
  list(input: ListBagInput): Promise<ListBagOutput>;
  get(id: string): Promise<GetBagOutput | null>;
}
