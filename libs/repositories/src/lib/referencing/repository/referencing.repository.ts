import {IReferencingRepository} from "@store-apis/repositories/referencing";
import {IReferencing} from "@store-apis/domains/referencing";
import {Injectable} from "@nestjs/common";
import {IReferencingProvider} from "@store-apis/data-sources/referencing";

@Injectable()
export class ReferencingRepository implements IReferencingRepository {
  constructor(private readonly referencingProvider: IReferencingProvider) {
  }

  findByInsider(insiderId: string): Promise<IReferencing> {
    return this.referencingProvider.provider.findOne({'insider.uid': insiderId})
  }
}
