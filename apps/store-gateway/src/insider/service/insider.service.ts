import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom, switchMap } from 'rxjs';
import { UserRecord } from 'firebase-admin/lib/auth';
import { AxiosError } from 'axios';

@Injectable()
export class InsiderService {
  constructor(private readonly httpService: HttpService) {}

  async getOrCreate(phoneNumber: string): Promise<UserRecord> {
    try {
      return await this.get(phoneNumber);
    } catch (e) {
      return await this.create(phoneNumber);
    }
  }

  private async get(phoneNumber: string): Promise<UserRecord> {
    const { data } = await lastValueFrom(
      this.httpService
        .get<UserRecord>(
          `${process.env.QUID_API_BASE_URL}/insider/${phoneNumber}`
        )
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
            throw 'An error occurred';
          })
        )
    );
    return data;
  }

  private async create(phoneNumber: string): Promise<UserRecord> {
    const { data } = await lastValueFrom(
      this.httpService
        .post<UserRecord>(`${process.env.QUID_API_BASE_URL}/insider`, {
          phoneNumber,
        })
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
            throw 'An error occurred';
          })
        )
    );
    return data;
  }
}
