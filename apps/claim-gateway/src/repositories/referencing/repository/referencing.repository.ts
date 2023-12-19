import {IReferencingRepository} from "../interface/referencing.repository.interface";
import {IReferencing} from "../../../domains/referencing";
import {Injectable} from "@nestjs/common";
import {IReferencingProvider} from "../../../data-sources/referencing/provider/referencing.provider";

@Injectable()
export class ReferencingRepository implements IReferencingRepository {
  constructor(private readonly referencingProvider: IReferencingProvider) {
  }

  findByInsider(insiderId: string): Promise<IReferencing> {
    return this.referencingProvider.findOne({'insider.uid': insiderId})
  }
}
