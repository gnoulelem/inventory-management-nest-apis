import {Injectable} from '@nestjs/common';
import {v4 as uuidV4} from "uuid";
import {IConfigurationRepository} from "@store-apis/repositories/configuration";
import {IStore} from "@store-apis/domains/shared";
import {IClaim, TCreateClaim} from "../../../../domains/claim";
import {IClaimRepository} from "../../../../repositories/claim/interface/claim.repository.interface";
import {Bill, BillItem} from "../../../../domains/bill";
import {IBillRepository} from "../../../../repositories/bill/interface/bill.repository.interface";
import {Income} from "../../../../domains/income";
import {IReferencing} from "../../../../domains/referencing";
import {IReferencingRepository} from "../../../../repositories/referencing/interface/referencing.repository.interface";
import {IIncomeRepository} from "../../../../repositories/income/interface/income.repository.interface";
import {getCurrentBillPeriod} from "../../utilities/bill.utlils";

@Injectable()
export class AppService {
  constructor(private readonly configurationRepository: IConfigurationRepository,
              private readonly claimRepository: IClaimRepository,
              private readonly billRepository: IBillRepository,
              private readonly referencingRepository: IReferencingRepository,
              private readonly incomeRepository: IIncomeRepository) {
  }

  getData(): { message: string } {
    return {message: 'Hello API'};
  }

  async handleClaim(createClaimRequest: TCreateClaim & {
    readonly id: string;
    readonly createdAt: number;
    readonly state: 'LATENT'
  }) {
    const billId = uuidV4()
    const [storeConfig, referencing] = await Promise.all([
      this.getStoreConfig(createClaimRequest.store.alias),
      await this.getInsiderReferencing(createClaimRequest.insider.uid)
    ])
    const claim: IClaim = {
      _id: undefined,
      ...createClaimRequest,
      amount: undefined,
      billId,
    };
    const bill = new Bill(claim, billId);
    const billItem = new BillItem(claim, storeConfig);
    claim.amount = (billItem.amount * storeConfig.quidCashGiftConfig.quidCashGiftPercentagePerSale) / 100;
    const income = new Income(claim, bill, billItem, storeConfig, referencing);

    await Promise.all([
      this.claimRepository.create(claim),
      this.billRepository.insertBillItem(billItem, bill, getCurrentBillPeriod()),
      this.incomeRepository.create(income)
    ])
  }

  private async getStoreConfig(storeAlias: string): Promise<IStore> {
    return this.configurationRepository.getStoreConfig(storeAlias)
  }

  private async getInsiderReferencing(insiderId: string): Promise<IReferencing> {
    return this.referencingRepository.findByInsider(insiderId);
  }
}
