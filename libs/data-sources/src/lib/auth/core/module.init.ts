import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as process from 'process';

@Injectable()
export class ModuleInit {
  static init(): void {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
  }
}
