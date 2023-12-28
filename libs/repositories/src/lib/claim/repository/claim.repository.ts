import {IClaimRepository} from "@store-apis/repositories/claim";
import {IClaim, TCreateClaim} from "@store-apis/domains/claim";
import {InsertOneResult} from "mongodb";
import {Injectable} from "@nestjs/common";
import {IClaimProvider} from "@store-apis/data-sources/claim";

@Injectable()
export class ClaimRepository implements IClaimRepository {
  constructor(private readonly claimProvider: IClaimProvider) {
  }

  create(entityLike: TCreateClaim): Promise<InsertOneResult<IClaim>> {
    return this.claimProvider.provider.insertOne(entityLike as IClaim)
  }

  retrievePerDate(storeId: string, date: string): Promise<IClaim[]> {
    const dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0);

    const timestamp = dateObject.getTime();
    return this.claimProvider
      .provider
      .find({
        'store.id': storeId,
        createdAt: {
          $gte: timestamp,
          $lt: dateObject.getTime() + 24 * 60 * 60 * 1000, // Add one day to the specific date
        },
      })
      .sort({createdAt: -1})
      .toArray();
  }
}
