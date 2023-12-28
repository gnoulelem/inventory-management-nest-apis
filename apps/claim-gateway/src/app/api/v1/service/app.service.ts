import {Injectable} from '@nestjs/common';
import {v4 as uuidV4} from "uuid";
import {IConfigurationRepository} from "@store-apis/repositories/configuration";
import {IStore} from "@store-apis/domains/shared";
import {IClaim, TCreateClaim} from "@store-apis/domains/claim";
import {
  IClaimRepository
} from "@store-apis/repositories/claim";
import {Bill, BillItem, IBill} from "@store-apis/domains/bill";
import {IBillRepository} from "@store-apis/repositories/bill";
import {Income} from "@store-apis/domains/income";
import {IReferencing} from "@store-apis/domains/referencing";
import {
  IReferencingRepository
} from "@store-apis/repositories/referencing";
import {
  IIncomeRepository
} from "@store-apis/repositories/income";
import {getCurrentBillPeriod} from "../../utilities/bill.utlils";
import {UserRecord} from "firebase-admin/lib/auth";
import {IInsiderRepository} from "@store-apis/repositories/insider";
import {IEmployeeRepository} from "@store-apis/repositories/employee";
import {IEmployee} from "@store-apis/domains/employee";

@Injectable()
export class AppService {
  constructor(
    private readonly configurationRepository: IConfigurationRepository,
    private readonly claimRepository: IClaimRepository,
    private readonly billRepository: IBillRepository,
    private readonly referencingRepository: IReferencingRepository,
    private readonly incomeRepository: IIncomeRepository,
    private readonly insiderRepository: IInsiderRepository,
    private readonly employeeRepository: IEmployeeRepository
  ) {
  }

  async handleClaim(createClaimRequest: TCreateClaim & {
    readonly id: string;
    readonly createdAt: number;
    readonly state: 'LATENT'
  }) {
    const billId = uuidV4()
    const [storeConfig, referencing] = await Promise.all([
      this.getStoreConfig(createClaimRequest.store.alias),
      this.getInsiderReferencing(createClaimRequest.insider.uid)
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

  getInsider(phoneNumber: string): Promise<UserRecord> {
    return this.insiderRepository.retrieveInsiderByPhoneNumber(phoneNumber)
  }

  createInsider(phoneNumber: string): Promise<UserRecord> {
    return this.insiderRepository.createInsider({phoneNumber})
  }

  getStoreEmployee(uid: string): Promise<IEmployee> {
    return this.employeeRepository.getMe(uid);
  }

  getIncomePerDate(storeId: string, date: string): Promise<Income[]> {
    return this.incomeRepository.retrievePerDate(storeId, date)
  }

  getIClaimPerDate(storeId: string, date: string): Promise<IClaim[]> {
    return this.claimRepository.retrievePerDate(storeId, date)
  }

  getStoreConfig(storeAlias: string): Promise<IStore> {
    return this.configurationRepository.getStoreConfig(storeAlias)
  }

  getBills(storeId: string): Promise<IBill[]> {
    return this.billRepository.findBills(storeId)
  }

  getBalances(storeId: string): Promise<{ latent: number; effective: number }> {
    return this.incomeRepository.retrieveBalances(storeId)
  }

  private getInsiderReferencing(insiderId: string): Promise<IReferencing> {
    return this.referencingRepository.findByInsider(insiderId);
  }
}
