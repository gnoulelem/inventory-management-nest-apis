import {IReferencing} from "../../../domains/referencing";

export abstract class IReferencingRepository {
  abstract findByInsider(insiderId: string): Promise<IReferencing>
}
