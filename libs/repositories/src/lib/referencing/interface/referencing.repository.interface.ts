import {IReferencing} from "@store-apis/domains/referencing";

export abstract class IReferencingRepository {
  abstract findByInsider(insiderId: string): Promise<IReferencing>
}
